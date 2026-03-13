import React, { useEffect } from 'react';
import Header from './Header';
import BackButton from './BackButton';
import './InputPage.css';

const AnalysisPrepPage = ({ onBack, showPopup, onPopupOk, capturedImage }) => {
  useEffect(() => {
    if (showPopup) {
      alert('Image analyzed successfully!');
      onPopupOk();
    }
  }, [showPopup, onPopupOk]);

  return (
    <div className="intro-page processing-page">
      <Header />

      <div className="instruction">TO START ANALYSIS</div>

      <div className="preview-wrapper">
        <div className="preview-container">
          <div className="preview-label">Preview</div>
          <div className="preview-box">
            {capturedImage && <img src={capturedImage} alt="Preview" className="preview-image" />}
          </div>
        </div>
      </div>

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
      
      <BackButton onClick={onBack} />
    </div>
  );
};

export default AnalysisPrepPage;
