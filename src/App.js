import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Match, Miss } from 'react-router';

import TasksView from './todo/containers/TasksView';
import AuthView from './auth/containers/AuthView';

import SideBar from './general/containers/SideBar';

class App extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div>
        <SideBar>
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
        </SideBar>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(App);
