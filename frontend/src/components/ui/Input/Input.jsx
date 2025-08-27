import React from 'react';
import './Input.css';

const Input = ({ label, error, ...props }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input className={`input-field ${error ? 'error' : ''}`} {...props} />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;