import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useTodo } from '../context/TodoContext';

const Statistics = () => {
  const { getTaskStats, clearCompleted, tasks } = useTodo();
  const stats = getTaskStats();
  const completionPercentage = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 mb-8">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-6 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Statistics</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-3xl font-bold text-red-600">{stats.highPriority}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-semibold">Completion Rate</span>
            <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Clear Completed Button */}
        {stats.completed > 0 && (
          <button
            onClick={clearCompleted}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold transition hover:bg-red-50 px-3 py-2 rounded"
          >
            <FaTrash /> Clear {stats.completed} Completed Task{stats.completed !== 1 ? 's' : ''}
          </button>
        )}
      </div>
    </div>
  );
};

export default Statistics;
