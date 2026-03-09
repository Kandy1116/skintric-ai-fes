import React from 'react';
import Header from './Header';

const ThankYouPage = ({ onProceed, onBack }) => {
  return (
    <div className="intro-page">
      <Header />

      <div className="center-wrapper">
        <div className="square square1"></div>
        <div className="square square2"></div>
        <div className="square square3"></div>

        <div className="intro-text">
          <h1>Thank you!</h1>
          <p className="text-sm text-gray-500 mt-2">Proceed for the next step</p>
        </div>
      </div>

      <div className="back-button" onClick={onBack}>
        <div className="diamond">
          <span>
            <i className="fa-solid fa-chevron-left"></i>
          </span>
        </div>
        <span>BACK</span>
      </div>

      <div className="proceed-button" onClick={onProceed}>
        <span>PROCEED</span>
        <div className="diamond">
          <span>
            <i className="fa-solid fa-chevron-right"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
