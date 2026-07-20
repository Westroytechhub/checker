import React from 'react';
import { FaHeadingFont, FaListCheck } from 'react-icons/fa6';

const Header = ({ stats }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <FaListCheck className="text-3xl" />
          <h1 className="text-4xl font-bold">My Tasks</h1>
        </div>
        <p className="text-blue-100 mb-4">Stay organized and productive</p>
        
        {stats && (
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-500 bg-opacity-30 rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-blue-100">Total Tasks</div>
            </div>
            <div className="bg-green-500 bg-opacity-30 rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.completed}</div>
              <div className="text-sm text-blue-100">Completed</div>
            </div>
            <div className="bg-orange-500 bg-opacity-30 rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.pending}</div>
              <div className="text-sm text-blue-100">Pending</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
