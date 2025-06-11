
import React from 'react';
import type { Recommendation } from '../types';

interface RecommendationDisplayProps {
  recommendation: Recommendation;
}

export const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ recommendation }) => {
  return (
    <div className="bg-slate-700/50 shadow-xl rounded-lg p-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-sky-400 mb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
        Recommended Model
      </h2>
      <p className="text-xl text-white font-medium bg-slate-600 px-4 py-2 rounded-md inline-block mb-4">
        {recommendation.modelName}
      </p>

      <h3 className="text-xl font-semibold text-sky-400 mb-2 mt-4 flex items-center">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.354a15.057 15.057 0 01-4.5 0m3.75-2.354c-.375 0-.75-.036-1.125-.105M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 4.5h.008v.008H12v-.008z" />
        </svg>
        Explanation
      </h3>
      <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">
        {recommendation.explanation}
      </p>
    </div>
  );
};
