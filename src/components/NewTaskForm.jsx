import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({onHandleSubmit}) => {
  const [title, setTitle] = useState('');

  const handleTaskChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title,
      isComplete: false,
    };
    onHandleSubmit(newTask);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Task Title:</label>
      <input type="text" id="title" name="title" value={title} onChange={handleTaskChange}/>
      <div>
        <input type="submit" value="Add a task" />
      </div>
    </form>
  );
};

export default NewTaskForm;