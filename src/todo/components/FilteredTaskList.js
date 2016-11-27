import React, { PropTypes } from 'react';

import Task from '../components/Task';

const interpolateColor = (color1, color2, factor = 0.5) => {
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ] : null;
  };

  const rgb2Hex = (rgb) => `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}` // eslint-disable-line
  ;

  const parsedColor1 = hexToRgb(color1);
  const parsedColor2 = hexToRgb(color2);
  const result = parsedColor1.map(
    (currentC1, index) =>
      Math.round(currentC1 + (factor * (parsedColor2[index] - currentC1))),
  );

  return rgb2Hex(result);
};

const interpolate = (index, length) => {
  const factor =
    (length <= 0)
      ? 0
      : 1 / Math.abs(length - 1);

  return interpolateColor('#e89bca', '#b866d4', factor * parseInt(index, 10));
};


function FilteredTaskList({ tasks, filter = 'ALL', activeUser, toggleTaskComplete, removeTask }) {
  const filteredTasks = tasks
    .filter((task) => {
      switch (filter) {
        case 'COMPLETED':
          return task.completedBy.includes(activeUser);
        case 'UNCOMPLETED':
          return !task.completedBy.includes(activeUser);
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
      {filteredTasks.map((task, index) =>
        <li key={task.key}>
          <Task
            task={task}
            backgroundColor={interpolate(index, filteredTasks.length)}
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
  activeUser: PropTypes.string.isRequired,
  toggleTaskComplete: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};

export default FilteredTaskList;
