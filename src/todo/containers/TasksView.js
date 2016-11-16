import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Match, Miss, Redirect } from 'react-router';

import { loadTasks, unloadTasks, addTask, updateTask, removeTask } from '../actions/taskActions';
import Header from '../../general/containers/Header';
import FilteredTaskList from '../components/FilteredTaskList';
import AddTaskForm from '../components/AddTaskForm';

class TasksView extends React.Component {
  componentWillMount() {
    this.props.loadTasks();
  }

  componentWillUnmount() {
    this.props.unloadTasks();
  }

  render() {
    return (
      <div>
        <Header title="Your Tasks" />
        <AddTaskForm onSubmit={this.props.addTask} />
        <FilteredTaskList
          tasks={this.props.tasks}
          filter="ALL"
          toggleTaskComplete={this.props.toggleTaskComplete}
          removeTask={this.props.removeTaskAction}
        />
      </div>
    );
  }
}

TasksView.propTypes = {
  loadTasks: PropTypes.func.isRequired,
  unloadTasks: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  toggleTaskComplete: PropTypes.func.isRequired,
  removeTaskAction: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  loadTasks: () => dispatch(loadTasks()),
  unloadTasks: () => dispatch(unloadTasks()),
  removeTaskAction: task => dispatch(removeTask(task)),
  addTask: task => dispatch(addTask(task)),
  toggleTaskComplete: task =>
    dispatch(updateTask({
      ...task,
      completed: !task.completed,
    })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksView);
