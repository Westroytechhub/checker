import React from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { formatDate, getPriorityBadgeColor, isOverdue, getDaysUntilDue } from '../utils/helpers';
import { useTodo } from '../context/TodoContext';

const TaskItem = ({ task, onEdit }) => {
  const { toggleComplete, deleteTask } = useTodo();
  const daysUntil = getDaysUntilDue(task.dueDate);
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 border-l-4 transition transform hover:shadow-lg ${
        task.completed ? 'border-green-500 opacity-75' : 'border-blue-500'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => toggleComplete(task.id)}
          className={`flex-shrink-0 mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.completed && <FaCheck className="text-white text-sm" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className={`text-lg font-semibold ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getPriorityBadgeColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mb-2">{task.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-3 text-xs">
            <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
              {task.category}
            </span>
            {task.dueDate && (
              <span
                className={`px-2 py-1 rounded ${
                  overdue
                    ? 'bg-red-100 text-red-700'
                    : daysUntil <= 1
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {overdue ? '⚠️ Overdue' : `📅 ${formatDate(task.dueDate)}`}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition"
            title="Edit task"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition"
            title="Delete task"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
