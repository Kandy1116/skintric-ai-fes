import React, { useEffect } from 'react';
import Header from './Header';
import './InputPage.css';

const ProcessingPage = ({ onProcessed }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onProcessed();
    }, 4000); // Set timer for 4 seconds

    return () => clearTimeout(timer);
  }, [onProcessed]);

  return (
    <div className="intro-page">
      <Header />

      <div className="center-wrapper">
        <div className="square square1"></div>
        <div className="square square2"></div>
        <div className="square square3"></div>

        <div className="intro-text">
                    <p className="text-gray-500">Processing submission</p>
                                                  <div className="flex justify-center items-center space-x-4" style={{ gap: '2px', marginTop: '40px' }}>
            <div className="dot dot1"></div>
            <div className="dot dot2"></div>
            <div className="dot dot3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
