import React, { useState, useEffect } from 'react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  initialApiKey?: string;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet, initialApiKey }) => {
  const [apiKey, setApiKey] = useState(initialApiKey || '');

  const handleSave = () => {
    localStorage.setItem('GEMINI_API_KEY', apiKey);
    onApiKeySet(apiKey);
  };

  return (
    <div className="mb-6 bg-slate-700/50 p-4 rounded-lg shadow-md">
      <label className="block text-slate-300 mb-2 font-medium" htmlFor="api-key-input">
        Enter your Google Gemini API Key:
      </label>
      <input
        id="api-key-input"
        type="text"
        className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-slate-100 mb-2"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder="Paste your Gemini API key here"
      />
      <button
        className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded font-medium"
        onClick={handleSave}
        disabled={!apiKey.trim()}
      >
        Save API Key
      </button>
    </div>
  );
};