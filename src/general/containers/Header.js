import React from 'react';
import { connect } from 'react-redux';

import PageTitle from '../components/PageTitle';

function Header({ title, toggleSidebar }) {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        height: '50px',
        background: 'blue',
      }}
    >
      <button
        onClick={toggleSidebar}
        style={{
          position: 'absolute',
          height: '50px',
          width: '50px',
          border: 'none',
          outline: 'none',
          fontSize: '1.2rem',
          background: 'lightblue',
          textAlign: 'center',
        }}
      >
        ☰
      </button>
      <h2
        style={{
          flex: '1',
          alignSelf: 'center',
          textAlign: 'center',
        }}
      >
        {title}
        <PageTitle title={title} />
      </h2>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  toggleSidebar: React.PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  pageTitle: state.page.title,
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
