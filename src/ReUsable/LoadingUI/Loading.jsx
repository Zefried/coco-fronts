// Load.js
import React from 'react';
import './Load.css';

const Load = {
  now: (show) => {
    if (!show) return null;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div className="loader"></div>
      </div>
    );
  },
};

export default Load;
