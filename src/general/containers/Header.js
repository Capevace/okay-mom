import React from 'react';
import { connect } from 'react-redux';

import PageTitle from '../components/PageTitle';

function Header({ title, toggleSidebar, RightButtonComponent, rightButtonProps }) {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        height: '50px',
        background: 'transparent',
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
          background: 'transparent',
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

      {RightButtonComponent &&
        <RightButtonComponent
          buttonStyle={{
            position: 'absolute',
            height: '50px',
            width: '50px',
            border: 'none',
            outline: 'none',
            fontSize: '1.2rem',
            background: 'transparent',
            textAlign: 'center',
            right: '0px',
          }}

          {...rightButtonProps}
        />
      }
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  toggleSidebar: React.PropTypes.func.isRequired,
  rightButtonProps: React.PropTypes.shape({}),
  RightButtonComponent: React.PropTypes.oneOf([
    React.PropTypes.element,
    React.PropTypes.func,
  ]),
};

const mapStateToProps = state => ({
  pageTitle: state.page.title,
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
