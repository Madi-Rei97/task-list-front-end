import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({onHandleSubmit}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title,
      description,
    };
    onHandleSubmit(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Task Title:</label>
      <input type="text" id="title" value={title} onChange={handleTitleChange}/>
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" value={description} onChange={handleDescriptionChange}/>
      <div>
        <input type="submit" value="Add a task" />
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;