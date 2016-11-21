import React from 'react';

import './Icon.css';

function Icon({ icon }) {
  return (
    <div className={`icono-${icon}`} />
  );
}

export default Icon;
