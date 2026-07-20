import React, { createContext, useState, useCallback, useEffect } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('todoAppTasks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('todoAppTasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }, [tasks]);

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      category: taskData.category || 'General',
      priority: taskData.priority || 'Medium',
      dueDate: taskData.dueDate || '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const getTaskStats = useCallback(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
      highPriority: tasks.filter((t) => t.priority === 'High' && !t.completed).length,
    };
  }, [tasks]);

  const filterTasks = useCallback(
    (filters) => {
      return tasks.filter((task) => {
        if (filters.status === 'completed' && !task.completed) return false;
        if (filters.status === 'pending' && task.completed) return false;
        if (filters.category && task.category !== filters.category) return false;
        if (filters.priority && task.priority !== filters.priority) return false;
        return true;
      });
    },
    [tasks]
  );

  const searchTasks = useCallback(
    (query) => {
      if (!query.trim()) return tasks;
      const lowerQuery = query.toLowerCase();
      return tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(lowerQuery) ||
          task.description.toLowerCase().includes(lowerQuery)
      );
    },
    [tasks]
  );

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, []);

  const exportTasks = useCallback(() => {
    return JSON.stringify(tasks, null, 2);
  }, [tasks]);

  const importTasks = useCallback((jsonData) => {
    try {
      const imported = JSON.parse(jsonData);
      if (Array.isArray(imported)) {
        setTasks(imported);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing tasks:', error);
      return false;
    }
  }, []);

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    getTaskStats,
    filterTasks,
    searchTasks,
    clearCompleted,
    exportTasks,
    importTasks,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider');
  }
  return context;
};
