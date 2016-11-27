import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../auth/actions/authActions';


class AuthView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };

    this.login = this.login.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  login() {
    this.props.loginAction(this.state.username, this.state.password);
  }

  updateUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  updatePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  submit(event) {
    event.preventDefault();

    login(this.state.username, this.state.password);
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.updateUsername}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.updatePassword}
        />

        <button type="submit">
          Login
        </button>
      </form>
    );
  }
}

AuthView.propTypes = {};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
