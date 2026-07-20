export const getPriorityColor = (priority) => {
  const colors = {
    Low: 'text-blue-500 bg-blue-50',
    Medium: 'text-yellow-500 bg-yellow-50',
    High: 'text-red-500 bg-red-50',
  };
  return colors[priority] || colors.Medium;
};

export const getPriorityBadgeColor = (priority) => {
  const colors = {
    Low: 'bg-blue-100 text-blue-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };
  return colors[priority] || colors.Medium;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const isOverdue = (dueDate, completed) => {
  if (completed || !dueDate) return false;
  return new Date(dueDate) < new Date();
};

export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diff = due.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const sortTasks = (tasks, sortBy) => {
  const sorted = [...tasks];
  switch (sortBy) {
    case 'date-asc':
      return sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    case 'date-desc':
      return sorted.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    case 'priority':
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    case 'created':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    default:
      return sorted;
  }
};
