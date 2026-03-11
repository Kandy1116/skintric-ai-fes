import React from 'react';
import './LabeledIcon.css';

const LabeledIcon = ({ icon, label, side }) => {
  return (
    <div className={`permission ${side}`}>
      <div className="square square1"></div>
      <div className="square square2"></div>
      <div className="square square3"></div>
      <div className="icon-wrapper">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div className="connector">
        <div className="dot"></div>
      </div>
      <div className="label">{label}</div>
    </div>
  );
};

export default LabeledIcon;
