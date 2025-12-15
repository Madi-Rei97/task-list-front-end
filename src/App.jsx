import { useState } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const toggleTaskComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, isComplete: !task.isComplete }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList
          tasks={tasks}
          toggleTaskComplete={toggleTaskComplete}
          deleteTask={deleteTask}
        />
      </main>
    </div>
  );
};

export default App;
