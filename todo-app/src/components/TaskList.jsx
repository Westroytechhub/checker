import React, { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import EditModal from './EditModal';
import { sortTasks } from '../utils/helpers';

const TaskList = ({ tasks, filters, searchQuery }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [sortBy, setSortBy] = useState('created');
  const { useTodo } = require('../context/TodoContext');

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Apply filters
    if (filters.status) {
      result = result.filter((task) =>
        filters.status === 'completed' ? task.completed : !task.completed
      );
    }
    if (filters.category && filters.category !== 'All') {
      result = result.filter((task) => task.category === filters.category);
    }
    if (filters.priority && filters.priority !== 'All') {
      result = result.filter((task) => task.priority === filters.priority);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    // Sort
    return sortTasks(result, sortBy);
  }, [tasks, filters, searchQuery, sortBy]);

  if (filteredTasks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-600">
            {searchQuery ? 'Try adjusting your search.' : 'Create a new task to get started!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-gray-700 font-semibold">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="created">Most Recent</option>
          <option value="date-asc">Due Soon</option>
          <option value="date-desc">Due Later</option>
          <option value="priority">By Priority</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={setEditingTask} />
        ))}
      </div>

      {editingTask && (
        <EditModal task={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </div>
  );
};

export default TaskList;
