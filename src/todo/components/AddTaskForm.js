import React from 'react';

import { baseTask } from '../baseTask';
import UserSelectorInput from './UserSelectorInput';

class AddTaskForm extends React.Component {
  constructor() {
    super();
    this.baseTask = baseTask;
    this.state = { task: this.baseTask };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();

    const task = this.state.task;
    task.owner = this.props.ownerId;

    this.props.onSubmit(this.state.task);
    this.setState({ task: this.baseTask });
  }

  render() {
    return (
      <form
        onSubmit={this.submitForm}
        style={{
          textAlign: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Add Task"
          value={this.state.task.title}
          onChange={(event) => {
            this.setState({
              task: {
                ...this.state.task,
                title: event.target.value,
              },
            });
          }}
        />
        {/* <UserSelectorInput
            users={this.state.task.assignedUsers}
            suggestions={['Lukas']}
            onChange={(users) => {
              console.info(users);
              this.setState({
                task: {
                  ...this.state.task,
                  assignedUsers: users,
                },
              });
            }}
          /> */}
      </form>
    );
  }
}

AddTaskForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  ownerId: React.PropTypes.string.isRequired,
};

export default AddTaskForm;
