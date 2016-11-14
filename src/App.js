import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Match, Miss, Redirect } from 'react-router';

import TasksView from './todo/containers/TasksView';
import AuthView from './auth/containers/AuthView';

class App extends Component {
  render() {
    return (
      <div>
        <Match
          exactly
          pattern="/"
          render={() => // eslint-disable-line no-confusing-arrow
            this.props.loggedIn
              ? <TasksView />
              : <AuthView />
          }
        />
        <Miss
          component={() => <div>No match</div>}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('State update in App:', state);
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(App);
