import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss } from 'react-router';

import AuthView from '../../auth/containers/AuthView';
import FamilyRoute from '../../families/containers/FamilyRoute';
import SideBar from '../../general/containers/SideBar';

const MatchWhenAuthorized = ({ component: Component, authorized, ...rest }) => (
  <Match
    {...rest}
    render={props => (
      authorized ? (
        <Component {...props} />
      ) : (
        // <Redirect
        //   to={{
        //     pathname: '/login',
        //     state: { from: props.location },
        //   }}
        // />
        <AuthView />

      )
    )}
  />
);

class App extends React.Component {
  componentWillMount() {

  }

  render() {
    console.error('logged in', this.props.loggedIn);
    return (
      <div>
        <SideBar>
          <MatchWhenAuthorized
            exactly
            authorized={this.props.loggedIn}
            pattern="/"
            render={() => <div>Hello!</div>}
          />

          <MatchWhenAuthorized
            exactly
            authorized={this.props.loggedIn}
            pattern="/family/:key"
            component={FamilyRoute}
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
