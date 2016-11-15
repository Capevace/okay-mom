import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../auth/actions/authActions';
import { updateTask, removeTask } from '../actions/taskActions';

import Task from '../components/Task';

function FilteredTaskList({ tasks, toggleTaskComplete, removeTaskAction }) {
  return (
    <ul>
      {tasks.map(task =>
        <li key={task.key}>
          <Task
            task={task}
            onToggleComplete={() => {
              toggleTaskComplete(task);
            }}
            onRemove={() => {
              removeTaskAction(task);
            }}
          />
        </li>,
      )}
    </ul>
  );
}

const mapStateToProps = state => ({ tasks: state.tasks });

const mapDispatchToProps = dispatch => ({
  toggleTaskComplete: task =>
    dispatch(updateTask({
      ...task,
      completed: !task.completed,
    })),
  removeTaskAction: task => dispatch(removeTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilteredTaskList);
