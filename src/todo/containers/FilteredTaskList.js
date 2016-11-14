import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../auth/actions/authActions';

function FilteredTaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task, index) =>
        <li key={index}>{task.title}</li>,
      )}
    </ul>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return { tasks: state.tasks };
};

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FilteredTaskList);
