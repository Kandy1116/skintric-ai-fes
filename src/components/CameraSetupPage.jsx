import React, { useEffect } from 'react';
import Header from './Header';
import './CameraSetupPage.css';

const CameraSetupPage = ({ onSetupComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSetupComplete();
    }, 6000); // 6 seconds

    return () => clearTimeout(timer);
  }, [onSetupComplete]);

  return (
    <div className="intro-page camera-setup-page">
      <Header />
      <div className="center-wrapper">
        <div className="square square1"></div>
        <div className="square square2"></div>
        <div className="square square3"></div>
        <div className="camera-icon-container">
          <i className="fas fa-camera"></i>
        </div>
        <p className="setting-up-text">SETTING UP CAMERA...</p>
      </div>
      <div className="footer-instructions">
        <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
        <div className="guidelines">
          <span>NEUTRAL EXPRESSION</span>
          <span>FRONTAL POSE</span>
          <span>ADEQUATE LIGHTING</span>
        </div>
        <div className="slider-bar"></div>
      </div>
    </div>
  );
};

export default CameraSetupPage;
