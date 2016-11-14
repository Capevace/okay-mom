import React from 'react';

class AddTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      task: {
        title: '',
        completed: false,
      },
    };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();

    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.task);
    }

    this.setState({
      task: {
        title: '',
        completed: false,
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Add Task</h1>
        <form onSubmit={this.submitForm}>
          <input
            type="text" value={this.state.task.title} onChange={(event) => {
              this.setState({
                task: {
                  ...this.state.task,
                  title: event.target.value,
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
