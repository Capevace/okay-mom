import React from 'react';
import { style } from 'glamor';

import { baseTaskPropTypes } from '../baseTask';

// #e89bca
// #dc84d3
// #d789e3
// #cf75ee
// #ca85f3
// #b866d4
//
// Green: #cfffb4, green dark: #99c282
// Top left menu: #f7c4e1
// light font: #fff
// dark font: #5c3a59
// third font: #e9abb9


// console.log(interpolate(4, 10));

const taskStyle = style({
  display: 'flex',
  minHeight: '75px',
  boxShadow: '0px 0px 5px rgba(74, 66, 74, 0.2)',
  background: '#d789e3',
  marginBottom: '20px',
  marginLeft: '30px',
});

const sideButtonStyle = style({
  flex: '0 1',
  alignSelf: 'center',
  paddingLeft: '10px',
  paddingRight: '10px',
});

const centerTextStyle = style({
  flex: '1 0 0%',
  alignSelf: 'center',
  paddingLeft: '10px',
  paddingRight: '10px',

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const checkmarkButtonStyle = style({
  float: 'left',
  fontFamily: 'monospace',
  borderRadius: '100%',
  border: '2px solid white',
  background: 'transparent',
  height: '40px',
  width: '40px',
  fontSize: '20px',
  color: 'white',
  outline: 'none',
});

const deleteButtonStyle = style({
  width: '40px',
  height: '40px',
  float: 'right',
  fontFamily: 'monospace',
});

function Task({ task, onToggleComplete, onRemove, backgroundColor }) {
  const completedBy = task.completedBy;
  const owner = task.owner;
  const title = task.title;
  const completedForCurrentUser = completedBy.includes(owner);

  return (
    <div
      data-task-component
      {...taskStyle}
      style={{
        marginRight: completedForCurrentUser
          ? '0px'
          : '20px',
        marginLeft: completedForCurrentUser
          ? '40px'
          : '20px',
        backgroundColor: backgroundColor || 'transparent',
      }}
    >
      <div {...sideButtonStyle}>
        <button onClick={onToggleComplete} {...checkmarkButtonStyle}>
          {completedForCurrentUser ? '✓' : ' '.replace(/ /g, '\u00a0')}
        </button>
      </div>

      <div {...centerTextStyle}>
        <span
          style={{
            textDecoration: completedForCurrentUser
              ? 'line-through'
              : 'none',
          }}
        >
          {title}
        </span>
      </div>

      <div {...sideButtonStyle}>
        <button onClick={onRemove} {...deleteButtonStyle}>
          X
        </button>
      </div>
    </div>
  );
}

Task.propTypes = {
  task: React.PropTypes.shape(baseTaskPropTypes),
  backgroundColor: React.PropTypes.string,
  onToggleComplete: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default Task;
