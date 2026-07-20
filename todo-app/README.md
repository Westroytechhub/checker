# To-Do List Application

A modern, feature-rich to-do list application with local storage functionality, built with React and styled with Tailwind CSS.

## Features

- ✅ **Create Tasks** - Add new tasks with descriptions
- ✅ **Edit Tasks** - Modify existing tasks
- ✅ **Delete Tasks** - Remove completed or unwanted tasks
- ✅ **Mark Complete** - Toggle task completion status
- ✅ **Local Storage** - Persist tasks automatically
- ✅ **Categories** - Organize tasks by category
- ✅ **Priority Levels** - Set task priority (Low, Medium, High)
- ✅ **Due Dates** - Add due dates to tasks
- ✅ **Filter & Search** - Find tasks quickly
- ✅ **Statistics** - Track completion progress
- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark Mode** - Optional dark theme

## Tech Stack

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **Local Storage API** - Data persistence
- **React Hooks** - State management

## Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Statistics.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── TodoContext.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── index.js
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup

```bash
# Create React app
npx create-react-app todo-app
cd todo-app

# Install dependencies
npm install react-icons tailwindcss

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start development server
npm start
```

## API/Features Overview

### Task Object
```javascript
{
  id: string (unique identifier),
  title: string,
  description: string,
  category: string,
  priority: 'Low' | 'Medium' | 'High',
  dueDate: string (ISO format),
  completed: boolean,
  createdAt: string (ISO format),
  updatedAt: string (ISO format)
}
```

### Core Functions

- `addTask(task)` - Create new task
- `updateTask(id, updates)` - Modify task
- `deleteTask(id)` - Remove task
- `toggleComplete(id)` - Mark complete/incomplete
- `getTasks()` - Retrieve all tasks
- `filterTasks(filter)` - Filter by status/category
- `searchTasks(query)` - Search tasks

## Usage

### Create a Task
```javascript
addTask({
  title: 'Buy Groceries',
  description: 'Milk, eggs, bread',
  category: 'Shopping',
  priority: 'High',
  dueDate: '2024-12-25'
});
```

### Filter Tasks
```javascript
// By completion status
filterTasks({ status: 'completed' });

// By category
filterTasks({ category: 'Work' });

// By priority
filterTasks({ priority: 'High' });
```

### Search Tasks
```javascript
searchTasks('grocery');
```

## Local Storage

All tasks are automatically saved to browser's local storage under the key `todoAppTasks`. The application will:

- Load tasks from storage on startup
- Auto-save on every change
- Support data export/import
- Clear storage on user request

## Keyboard Shortcuts

- `Ctrl/Cmd + N` - New task
- `Ctrl/Cmd + F` - Focus search
- `Escape` - Close dialogs
- `Enter` - Submit forms

## Performance

- Debounced search (300ms)
- Memoized components
- Virtual scrolling for large lists
- Optimized re-renders

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

- [ ] Cloud sync with Firebase
- [ ] Recurring tasks
- [ ] Task reminders/notifications
- [ ] Collaborative features
- [ ] Mobile app with React Native
- [ ] Voice input
- [ ] Task templates

## License

MIT

## Support

For issues and feature requests, please visit the repository.

---

**Happy organizing! 📝**
