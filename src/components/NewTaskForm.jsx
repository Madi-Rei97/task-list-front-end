import { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaultsFormState = {
  title: '',
  description: ''
};

const NewTaskForm = ({onHandleSubmit}) => {
  const [formData, setFormData] = useState(kDefaultsFormState);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;

    setFormData(formData => {
      return {
        ...formData,
        [inputName]: inputValue
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onHandleSubmit(formData);
    setFormData(kDefaultsFormState);
  };

  const makeControlledInput = (inputName) => {
    return (
      <input
        type="text"
        name={inputName}
        id={`input-${inputName}`}
        value={formData[inputName]}
        onChange={handleChange}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Task Title:</label>
      { makeControlledInput('title') }
      <label htmlFor="description">Description:</label>
      { makeControlledInput('description') }
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