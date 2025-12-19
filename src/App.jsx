import './App.css';
import NewTaskForm from './components/NewTaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

const kbaseURL = import.meta.env.VITE_BASE_URL;

const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`).then(response => response.data)
    .catch(error => console.log(error));
};

const convertFromAPI = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete || false,
  };

  delete newTask.is_complete;

  return newTask;
};

const addTaskAPI = (newTask) => {
  return axios.post(`${kbaseURL}/tasks`, newTask)
    .catch(error => console.log(error));
};

const toggleTaskCompleteAPI = (id, isComplete) => {
  const endpoint = isComplete ? 'mark_incomplete' : 'mark_complete';
  return axios.patch(`${kbaseURL}/tasks/${id}/${endpoint}`)
    .catch(error => console.log(error));
};

const deleteTaskAPI = id => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
    .catch(error => console.log(error));
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    return getAllTasksAPI()
      .then(tasks => {
        const newTasks = tasks.map(convertFromAPI);
        setTasks(newTasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleTaskComplete = taskId => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    return toggleTaskCompleteAPI(taskId, task.isComplete)
      .then(() => {
        return setTasks(tasks => {
          return tasks.map(t => t.id === taskId ? { ...t, isComplete: !t.isComplete } : t);
        });
      });
  };

  const deleteTask = taskId => {
    return deleteTaskAPI(taskId)
      .then(() => {
        return setTasks(tasks => {
          return tasks.filter(task => task.id !== taskId);
        });
      });
  };

  const onHandleSubmit = (data) => {
    return addTaskAPI(data)
      .then((result) => {
        return setTasks((prevTasks) => [convertFromAPI(result.data), ...prevTasks]);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <NewTaskForm
          onHandleSubmit={onHandleSubmit}/>
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
