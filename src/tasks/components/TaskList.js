import React from 'react';

function TaskList({ tasks }) {
  return (
    <div>
      {JSON.stringify(tasks)}
    </div>
  );
}

TaskList.propTypes = {
  tasks: React.PropTypes.arrayOf({}),
};

export default TaskList;
