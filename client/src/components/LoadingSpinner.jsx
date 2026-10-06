import React from 'react';
import '../styles/loadingSpinner.css';

function LoadingSpinner({ message = 'Loading todos...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">{message}</p>
    </div>
  );
}

export default LoadingSpinner;