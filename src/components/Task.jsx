import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, toggleTaskComplete, deleteTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => toggleTaskComplete(id)}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => deleteTask(id)}
      >x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  toggleTaskComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
