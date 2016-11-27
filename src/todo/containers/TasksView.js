import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Match, Miss, Redirect } from 'react-router';

import { loadTasks, unloadTasks, addTask, updateTask, removeTask } from '../actions/taskActions';
import Header from '../../general/containers/Header';
import FilterHeaderButton from '../../general/components/FilterHeaderButton';
import FilteredTaskList from '../components/FilteredTaskList';
import AddTaskForm from '../components/AddTaskForm';

class TasksView extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor() {
    super();
    this.filters = [
      {
        name: 'All',
        value: 'ALL',
      },
      {
        name: 'Uncompleted',
        value: 'UNCOMPLETED',
      },
      {
        name: 'Completed',
        value: 'COMPLETED',
      },
    ];
    this.filterChanged = this.filterChanged.bind(this);

    this.state = {
      filter: 'ALL',
    };
  }

  componentWillMount() {
    this.props.loadTasks();
  }

  componentWillUnmount() {
    this.props.unloadTasks();
  }

  filterChanged(filter) {
    this.setState({ filter });
  }

  render() {
    return (
      <div>
        <Header
          title="Your Tasks"
          RightButtonComponent={FilterHeaderButton}
          rightButtonProps={{
            filterChanged: this.filterChanged,
            filters: this.filters,
          }}
        />
        <AddTaskForm
          onSubmit={this.props.addTask}
          ownerId={this.props.currentUserId}
        />
        <FilteredTaskList
          tasks={this.props.tasks}
          filter={this.state.filter}
          activeUser={this.props.currentUserId}
          toggleTaskComplete={(task) => {
            this.props.toggleTaskComplete(task, this.props.currentUserId);
          }}
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
  currentUserId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  currentUserId: state.auth.user.uid,
});

const mapDispatchToProps = dispatch => ({
  loadTasks: () => dispatch(loadTasks()),
  unloadTasks: () => dispatch(unloadTasks()),
  removeTaskAction: task => dispatch(removeTask(task)),
  addTask: task => dispatch(addTask(task)),
  toggleTaskComplete: (task, userId) => {
    const updatedTask = task;
    updatedTask.completedBy =
      (task.completedBy.includes(userId))
        ? task.completedBy.filter(user => user !== userId)
        : [...task.completedBy, userId];

    dispatch(updateTask(updatedTask));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksView);
