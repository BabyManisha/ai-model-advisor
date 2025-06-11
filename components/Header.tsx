import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 max-w-3xl">
        <div className="flex items-center space-x-3">
          {/* Academic Cap Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-sky-400">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM12 13.47l-7-3.82v3.65l7 3.87 7-3.87V9.65l-7 3.82z"/>
          </svg>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            AI Model <span className="text-sky-400">Advisor</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
