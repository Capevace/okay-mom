import React, { PropTypes } from 'react';

import Task from '../components/Task';

function FilteredTaskList({ tasks, filter = 'ALL', toggleTaskComplete, removeTask }) {
  const filteredTasks = tasks
    .filter((task) => {
      switch (filter) {
        case 'COMPLETED':
          return task.completed;
        case 'UNCOMPLETED':
          return !task.completed;
        case 'ALL':
        default:
          return true;
      }
    });

  return (
    <ul
      style={{
        listStyleType: 'none',
        paddingLeft: '0px',
      }}
    >
      {filteredTasks.map(task =>
        <li key={task.key}>
          <Task
            task={task}
            onToggleComplete={() => {
              toggleTaskComplete(task);
            }}
            onRemove={() => {
              removeTask(task);
            }}
          />
        </li>,
      )}
    </ul>
  );
}

FilteredTaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  toggleTaskComplete: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};

export default FilteredTaskList;
