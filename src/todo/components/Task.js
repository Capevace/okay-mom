import React from 'react';

function Task({ task: { title, completed }, onToggleComplete, onRemove }) {
  return (
    <div className="task">
      <span className="title">
        {title}
      </span>
      <button
        className="completed"
        style={{
          fontFamily: 'monospace',
        }}
        onClick={onToggleComplete}
      >
        {completed ? '(✓)' : '( )'}
      </button>
      <button
        className="remove"
        style={{
          fontFamily: 'monospace',
        }}
        onClick={onRemove}
      >
        X
      </button>
    </div>
  );
}

export default Task;
