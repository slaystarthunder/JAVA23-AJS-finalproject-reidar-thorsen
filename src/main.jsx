import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { TaskProvider as TaskDataProvider } from './contexts/TaskContext';
import './styles/index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <TaskDataProvider>
    <App />
  </TaskDataProvider>
);
