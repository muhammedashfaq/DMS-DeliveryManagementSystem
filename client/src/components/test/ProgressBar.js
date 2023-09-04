import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="line" style={{ width: progress + '%' }}></div>
    </div>
  );
};

export default ProgressBar;
