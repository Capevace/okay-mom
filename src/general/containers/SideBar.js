import React from 'react';
import { connect } from 'react-redux';

const sidebarWidth = '250px';

function SideBar({ children, sidebarActive, toggleSidebar }) {
  return (
    <div>
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        style={{
          background: 'white',
          display: 'block',
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: sidebarActive ? 'all' : 'none',
          opacity: sidebarActive ? 0.6 : 0,
          transition: 'opacity 300ms ease',
          willChange: 'opacity',
        }}
        onClick={toggleSidebar}
      />
      <div
        style={{
          display: 'block',
          position: 'absolute',
          background: 'red',
          height: '100%',
          width: sidebarWidth,
          left: `-${sidebarWidth}`,
          transform: sidebarActive ? `translateX(${sidebarWidth})` : 'translateX(0px)',
          zIndex: 20,
          transition: 'transform 300ms ease',
          willChange: 'transform',
        }}
      >
        <h1>OkayMom</h1>
        <ul>
          <li>
            something
          </li>
          <li>
            something
          </li>
          <li>
            something
          </li>
          <li>
            something
          </li>
        </ul>
      </div>
      <div
        className="main"
        style={{
          transform: sidebarActive ? `translateX(${sidebarWidth})` : 'translateX(0px)',
          overflow: sidebarActive ? 'hidden' : 'auto',
          transition: 'transform 300ms ease',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

SideBar.propTypes = {
  children: React.PropTypes.node,
  sidebarActive: React.PropTypes.bool,
  toggleSidebar: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sidebarActive: state.page.sidebarActive,
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
