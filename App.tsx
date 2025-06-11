import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { RecommendationDisplay } from './components/RecommendationDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { getAIModelRecommendation } from './services/geminiService';
import type { Recommendation } from './types';
import { Footer } from './components/Footer';
import { ApiKeyInput } from './components/ApiKeyInput';

const App: React.FC = () => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem('GEMINI_API_KEY'));

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
  };

  const handleTaskSubmit = useCallback(async (taskDescription: string) => {
    if (!apiKey) {
      setError("Please enter your Gemini API key.");
      setRecommendation(null);
      return;
    }
    if (!taskDescription.trim()) {
      setError("Please describe your task.");
      setRecommendation(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await getAIModelRecommendation(taskDescription, apiKey);
      setRecommendation(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred. Please ensure your API key is configured correctly and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Error fetching recommendation:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8">
          {!apiKey && (
            <ApiKeyInput onApiKeySet={handleApiKeySet} />
          )}
          <p className="text-slate-300 mb-6 text-center text-lg">
            Describe your task, and our AI advisor will suggest the most suitable AI model and explain why.
          </p>
          <TaskInput onSubmit={handleTaskSubmit} isLoading={isLoading} />

          {isLoading && (
            <div className="mt-8 flex justify-center loading-spinner-container"> {/* Added class for specific styling */}
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="mt-8">
              <ErrorMessage message={error} />
            </div>
          )}

          {recommendation && !isLoading && !error && (
            <div className="mt-8">
              <RecommendationDisplay recommendation={recommendation} />
            </div>
          )}

          {!isLoading && !error && !recommendation && (
            <div className="mt-12 text-center text-slate-400">
              <div className="inline-block bg-slate-700 p-6 rounded-lg shadow-md">
                {/* Academic Cap Icon for placeholder */}
                <div className="placeholder-icon">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 mx-auto mb-4 text-sky-500">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM12 13.47l-7-3.82v3.65l7 3.87 7-3.87V9.65l-7 3.82z"/>
                  </svg> */}
                  <img
                    src="./logo.png"
                    alt="Academic Cap Icon"
                    className="w-10 h-10 text-sky-400"
                  />
                </div>
                <p className="text-xl">Your AI model recommendation will appear here.</p>
                <p className="text-sm mt-1">Enter your task above to get started!</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
