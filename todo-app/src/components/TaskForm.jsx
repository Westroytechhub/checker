import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useTodo } from '../context/TodoContext';

const TaskForm = () => {
  const { addTask } = useTodo();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    priority: 'Medium',
    dueDate: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      addTask(formData);
      setFormData({
        title: '',
        description: '',
        category: 'General',
        priority: 'Medium',
        dueDate: '',
      });
      setShowForm(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mb-8">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <FaPlus /> Add New Task
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add task details"
              rows="3"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                <option>General</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Shopping</option>
                <option>Health</option>
                <option>Learning</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskForm;
