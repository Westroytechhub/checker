import React, { useState } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { checkResults } from '../services/api';

const ResultsChecker = () => {
  const [indexNumber, setIndexNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setResults(null);
    setLoading(true);
    setSearched(true);

    try {
      if (!indexNumber.trim()) {
        setError('Please enter an index number');
        setLoading(false);
        return;
      }

      const response = await checkResults(indexNumber);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Results not found. Please check the index number.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">BECE Results Checker</h2>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={indexNumber}
            onChange={(e) => setIndexNumber(e.target.value)}
            placeholder="Enter index number (e.g., 1234567890)"
            className="flex-1 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-bold px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
            {loading ? 'Checking...' : 'Check Results'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {results && (
        <div className="bg-green-50 border border-green-300 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">✓ Results Found</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Student Name</p>
              <p className="text-lg font-semibold text-gray-800">
                {results.student_name || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Index Number</p>
              <p className="text-lg font-semibold text-gray-800">
                {results.index_number}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Exam Type</p>
              <p className="text-lg font-semibold text-gray-800">
                {results.exam_type}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Year</p>
              <p className="text-lg font-semibold text-gray-800">
                {results.exam_year}
              </p>
            </div>
          </div>

          {results.result_data && (
            <div className="bg-white rounded p-4">
              <p className="text-sm font-bold text-gray-700 mb-3">Subject Scores:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(results.result_data).map(([subject, score]) => (
                  <div key={subject} className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">{subject}:</span>
                    <span className="font-semibold text-blue-600">{score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.status && (
            <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded">
              <p className="text-sm">
                <span className="font-semibold">Status:</span>{' '}
                <span className="text-blue-700">{results.status}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {searched && !results && !error && !loading && (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 px-4 py-3 rounded">
          No results found for this index number. Please verify and try again.
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
        <p className="font-semibold mb-2">📝 How to use:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Enter your BECE index number in the search box</li>
          <li>Click "Check Results" to retrieve your exam results</li>
          <li>Results are displayed by subject and score</li>
          <li>This service is available 24/7 and completely free</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsChecker;
