import React from 'react';
import ResultsChecker from '../components/ResultsChecker';

const ResultsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <ResultsChecker />
      </div>
    </div>
  );
};

export default ResultsPage;
