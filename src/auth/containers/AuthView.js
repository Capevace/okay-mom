import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../auth/actions/authActions';

function AuthView({ loginAction }) {
  return (
    <button
      onClick={() => {
        loginAction('lukas.mateffy@gmail.com', 'Ferenc01');
      }}
    >
      Login
    </button>
  );
}

AuthView.propTypes = {
  loginAction: React.PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  loginAction: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
