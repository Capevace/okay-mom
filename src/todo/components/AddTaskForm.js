import React from 'react';

import UserSelectorInput from './UserSelectorInput';

class AddTaskForm extends React.Component {
  constructor() {
    super();
    this.baseTask = {
      key: '',
      title: '',
      completed: false,
      assignedUsers: [],
    };

    this.state = { task: this.baseTask };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();

    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.task);
    }

    this.setState({ task: this.baseTask });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
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
          <UserSelectorInput
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
          />
        </form>
      </div>
    );
  }
}

export default AddTaskForm;
