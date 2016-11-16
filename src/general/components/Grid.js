import React from 'react';

import './Grid.css';

function generateParentComponent(className, displayName = 'ParentComponent') {
  const Component = props => (
    <div className={className} {...props}>
      {props.children}
    </div>
  );
  Component.displayName = displayName;

  return Component;
}


export const GridContainer = generateParentComponent('container', 'GridContainer');
export const GridRow = generateParentComponent('row', 'GridRow');

export function GridCol({ children, width = 12 }) {
  return (
    <div className={`col-${width}`}>
      {children}
    </div>
  );
}
