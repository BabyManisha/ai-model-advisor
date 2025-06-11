
import React, { useState } from 'react';

interface TaskInputProps {
  onSubmit: (task: string) => void;
  isLoading: boolean;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onSubmit, isLoading }) => {
  const [taskDescription, setTaskDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="taskDescription" className="block text-sm font-medium text-slate-300 mb-1">
          Describe your AI task:
        </label>
        <textarea
          id="taskDescription"
          name="taskDescription"
          rows={4}
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400 transition-colors duration-150"
          placeholder="e.g., 'Generate an image of a futuristic city at sunset', 'Translate a complex legal document from English to Spanish', 'Write a Python script to analyze CSV data'"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !taskDescription.trim()}
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors duration-150"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'Get Recommendation'
        )}
      </button>
    </form>
  );
};
