import React from 'react';

function Task({ task, onToggleComplete, onRemove }) {
  console.log(task);
  const completedBy = task.completedBy;
  const owner = task.owner;
  const title = task.title;
  const completedForCurrentUser = completedBy.includes(owner);

  return (
    <div
      className="task"
      style={{
        display: 'flex',
        minHeight: '50px',
        borderBottom: '1px solid black',
      }}
    >
      <div
        style={{
          flex: '0 1',
          alignSelf: 'center',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        <button
          className="completed"
          style={{
            float: 'left',
            fontFamily: 'monospace',
            borderRadius: '100%',
            border: '1px solid darkgray',
            background: 'transparent',
            height: '40px',
            width: '40px',
            fontSize: '20px',
            color: 'green',
            outline: 'none',
          }}
          onClick={onToggleComplete}
        >
          {completedForCurrentUser ? '✓' : ' '.replace(/ /g, '\u00a0')}
        </button>
      </div>

      <div
        style={{
          flex: '1 0 0%',
          alignSelf: 'center',
          paddingLeft: '10px',
          paddingRight: '10px',

          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <span
          className="title"
          style={{
            textDecoration: completedForCurrentUser ? 'line-through' : 'none',
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          flex: '0 1',
          alignSelf: 'center',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        <button
          className="remove"
          style={{
            width: '40px',
            height: '40px',
            float: 'right',
            // lineHeight: '40px',
            fontFamily: 'monospace',
          }}
          onClick={onRemove}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Task;
