import React from 'react';
import { style, placeholder, merge } from 'glamor';

import { baseTask } from '../baseTask';
import UserSelectorInput from './UserSelectorInput';

const formStyle = style({
  height: '75px',
  width: '100%',
  boxSizing: 'border-box',
  paddingTop: '15px',
});

const inputStyle = merge(
  style({
    display: 'block',
    height: '40px',
    margin: 'auto',
    maxWidth: '300px',
    textAlign: 'center',
    fontSize: '20px',
    width: '350px',
    // '@media (max-width: 349px)': {
    //   width: '100%',
    // },
    border: 'none',
    borderBottom: '2px solid rgba(169, 169, 169, 0.6)',
    transition: 'border-bottom-color 300ms ease',
    outline: 'none',
    // ':focus': {
    //   borderBottomColor: 'rgba(169, 169, 169, 1)',
    // },
    background: 'rgba(138, 80, 102, 0.26)',
    color: 'white',
  }),
  placeholder({
    color: 'white',
    opacity: 0.7,
  }),
);

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
        {...formStyle}
      >
        <input
          {...inputStyle}
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
