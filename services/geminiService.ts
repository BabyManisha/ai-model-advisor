import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { Recommendation } from '../types';
import { GEMINI_MODEL_NAME, SYSTEM_INSTRUCTION, USER_PROMPT_TEMPLATE } from '../constants';

// Remove: const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getAIModelRecommendation(taskDescription: string, apiKey: string): Promise<Recommendation> {
  if (!apiKey) {
    return Promise.reject(new Error("Gemini API Key is not set. Please enter your API key."));
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const fullPrompt = USER_PROMPT_TEMPLATE(taskDescription);
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // Omitting thinkingConfig to use default (enabled for higher quality)
      }
    });

    const rawText = response.text;

    const modelMatch = rawText.match(/RECOMMENDED_MODEL_START([\s\S]*?)RECOMMENDED_MODEL_END/);
    const explanationMatch = rawText.match(/EXPLANATION_START([\s\S]*?)EXPLANATION_END/);

    let modelName = "AI Recommendation (Parsing Incomplete)";
    let explanation = "Could not fully parse the AI's response. Raw output below:\n\n" + rawText;

    if (modelMatch && modelMatch[1]) {
      modelName = modelMatch[1].trim();
    }

    if (explanationMatch && explanationMatch[1]) {
      explanation = explanationMatch[1].trim();
    } else if (modelMatch && modelMatch[1]) {
      // If model was found but specific explanation block wasn't, it implies the rest of the text might be it,
      // or the structure was broken. Default explanation provides rawText.
      explanation = `The AI recommended: ${modelName}. However, the detailed explanation could not be fully parsed. Raw output: \n\n${rawText}`;
    }
    
    // If both are parsed successfully, use them.
    if (modelMatch && modelMatch[1] && explanationMatch && explanationMatch[1]) {
        modelName = modelMatch[1].trim();
        explanation = explanationMatch[1].trim();
    }


    if (!modelMatch && !explanationMatch && rawText.length > 0) {
        // If neither delimiter was found, but there's text, use it all as explanation.
        modelName = "General AI Response";
        explanation = rawText;
    }


    return { modelName, explanation };

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error) {
        // Check for common API key related errors (this is a guess, actual error messages may vary)
        if (error.message.includes("API key not valid") || error.message.includes("PERMISSION_DENIED")) {
             throw new Error("Gemini API request failed. Please check if your API key is valid and has the necessary permissions.");
        }
        throw new Error(`Failed to get recommendation from AI: ${error.message}`);
    }
    throw new Error('An unknown error occurred while communicating with the AI.');
  }
}