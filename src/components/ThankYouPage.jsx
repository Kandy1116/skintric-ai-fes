import React, { useState, useEffect } from 'react';
import Header from './Header';

import BackButton from './BackButton';

const ThankYouPage = ({ onProceed, onBack }) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 500); // Delay to sync with text appearance
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="intro-page">
      <Header />

      <div className="center-wrapper">
        <div className="square square1"></div>
        <div className="square square2"></div>
        <div className="square square3"></div>

        <div className="intro-text flex flex-col items-center">
          <h1>Thank you!</h1>
          <p className="text-lg text-gray-500 mt-2">Proceed for the next step</p>
        </div>
      </div>

            <BackButton onClick={onBack} />

      <div className={`proceed-button ${isButtonVisible ? 'animate-slide-in-from-left' : ''}`} onClick={onProceed}>
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
