import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const FilterBar = ({ onFilterChange, onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    category: 'All',
    priority: 'All',
  });

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mb-8">
      {/* Search Bar */}
      <div className="mb-4 relative">
        <FaSearch className="absolute left-4 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-gray-700 font-semibold mb-4 hover:text-blue-600 transition"
      >
        <FaFilter /> Filters
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option>All</option>
                <option>General</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Shopping</option>
                <option>Health</option>
                <option>Learning</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option>All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
