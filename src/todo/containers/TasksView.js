import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Match, Miss, Redirect } from 'react-router';

import { loadTasks, unloadTasks, addTask, updateTask, removeTask } from '../actions/taskActions';
import Header from '../../general/containers/Header';
import FilteredTaskList from '../components/FilteredTaskList';
import AddTaskForm from '../components/AddTaskForm';
import Icon from '../../general/components/Icon';

class FilterHeaderButton extends React.Component {
  constructor() {
    super();
    this.state = {
      showSelector: false,
    };

    this.toggleSelector = this.toggleSelector.bind(this);
  }

  toggleSelector() {
    this.setState({
      showSelector: !this.state.showSelector,
    });
  }

  render() {
    return (
      <div
        style={{
          ...this.props.buttonStyle,
          position: 'relative',
        }}
      >

        <button
          onClick={this.toggleSelector}
          style={{
            ...this.props.buttonStyle,
            position: 'relative',
          }}
        >
          <Icon icon="filter" />
        </button>

        {this.state.showSelector &&
          <div
            style={{
              position: 'absolute',
              right: '0px',
              padding: '20px 20px 20px 10px',
              minWidth: '150px',
              background: 'lightblue',
            }}
          >
            <ul style={{ margin: 0 }}>
              {this.props.filters.map(({ name, value }, index) => (
                <li
                  style={{ margin: 0 }}
                  key={index}
                >
                  <button
                    onClick={() => {
                      this.props.filterChanged(value);
                      this.toggleSelector();
                    }}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    );
  }
}

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
    console.log('lol', task, userId);
    const updatedTask = task;

    console.log(updatedTask.completedBy);

    if (!task.completedBy.includes(userId)) {
      updatedTask.completedBy.push(userId);
    } else {
      updatedTask.completedBy = updatedTask.completedBy.filter(user => user !== userId);
    }

    console.log(updatedTask.completedBy);

    dispatch(updateTask(updatedTask));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksView);
