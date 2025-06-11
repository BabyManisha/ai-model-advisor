
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/30 py-6 text-center mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-sm text-slate-400">
          AI Model Advisor &copy; {new Date().getFullYear()}. Powered by <a href="https://babymanisha.com" target="_blank">Baby Manisha Sunkara</a>
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Disclaimer: Recommendations are AI-generated and for informational purposes only.
        </p>
      </div>
    </footer>
  );
};
