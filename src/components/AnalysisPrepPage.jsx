import React, { useEffect } from 'react';
import Header from './Header';
import BackButton from './BackButton'; // Back button for error cases
import './InputPage.css';

const AnalysisPrepPage = ({ onBack, showPopup, onPopupOk }) => {
  useEffect(() => {
    if (showPopup) {
      alert('Image analyzed successfully!');
      onPopupOk();
    }
  }, [showPopup, onPopupOk]);

  return (
    <div className="intro-page processing-page">
      <Header />

      <div className="center-wrapper">
        <div className="square square1"></div>
        <div className="square square2"></div>
        <div className="square square3"></div>

        <div className="loader-container">
          <p className="processing-text">PREPARING YOUR ANALYSIS...</p>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      {/* The back button is here for API error handling */}
      <BackButton onClick={onBack} />
    </div>
  );
};

export default AnalysisPrepPage;
