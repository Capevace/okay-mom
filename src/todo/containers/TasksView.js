import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss, Redirect } from 'react-router';
import { loadTasks, unloadTasks, addTask } from '../actions/taskActions';
import FilteredTaskList from './FilteredTaskList';
import AddTaskForm from '../components/AddTaskForm';

// const List = () => (
//   <div>
//     <h1>Tasks</h1>
//     <FilteredTaskList />
//   </div>
// );
//
// const Add = () => (
//   <div>
//     <h1>Add Task</h1>
//     <AddTaskForm />
//   </div>
// );

class TasksView extends React.Component {
  componentWillMount() {
    this.props.loadTasks();
  }

  componentWillUnmount() {
    this.props.unloadTasks();
  }

  render() {
    return (
      <div id="task-view">
        <h1>Tasks</h1>
        <AddTaskForm onSubmit={this.props.addTask} />
        <FilteredTaskList />
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  loadTasks: () => dispatch(loadTasks()),
  unloadTasks: () => dispatch(unloadTasks()),
  addTask: task => dispatch(addTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksView);
