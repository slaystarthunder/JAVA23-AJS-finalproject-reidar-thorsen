import React from 'react';
import ScrumBoard from './pages/ScrumBoard.jsx';
import ErrorMessage from './components/ErrorHandling/ErrorMessage';
import { useTasks } from './contexts/TaskContext';
import './styles/index.css';

const App = () => {
  const { error } = useTasks();
  return (
    <div className="app">
      <ErrorMessage error={error} />
      <ScrumBoard />
    </div>
  );
};

export default App;
