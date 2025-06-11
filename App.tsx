
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { RecommendationDisplay } from './components/RecommendationDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { getAIModelRecommendation } from './services/geminiService';
import type { Recommendation } from './types';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTaskSubmit = useCallback(async (taskDescription: string) => {
    if (!taskDescription.trim()) {
      setError("Please describe your task.");
      setRecommendation(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await getAIModelRecommendation(taskDescription);
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8">
          <p className="text-slate-300 mb-6 text-center text-lg">
            Describe your task, and our AI advisor will suggest the most suitable AI model and explain why.
          </p>
          <TaskInput onSubmit={handleTaskSubmit} isLoading={isLoading} />

          {isLoading && (
            <div className="mt-8 flex justify-center">
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
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-sky-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg> */}
                  <img
                    src="./logo.png"
                    alt="Academic Cap Icon"
                    className="w-10 h-10 text-sky-400"
                  />
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
