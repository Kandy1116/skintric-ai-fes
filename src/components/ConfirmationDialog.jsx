import React from 'react';
import './ConfirmationDialog.css';

const ConfirmationDialog = ({ onAllow, onDeny, message }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button onClick={onDeny} className="deny-button">DENY</button>
          <button onClick={onAllow} className="allow-button">ALLOW</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;