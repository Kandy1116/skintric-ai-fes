import React from 'react';
import Header from './Header';
import BackButton from './BackButton';
import LabeledIcon from './LabeledIcon'; // Import the new component
import './InputPage.css'; // Reusing styles for squares and animations
import './LabeledIcon.css'; // Import the new component's styles

const AnalysisPage = ({ onBack }) => {
  const leftLabel = (
    <>
      ALLOW A.I. <br /> TO SCAN YOUR FACE
    </>
  );

  const rightLabel = (
    <>
      ALLOW A.I. <br /> ACCESS GALLERY
    </>
  );

  return (
    <div className="intro-page flex flex-col">
      <Header />
      <div className="instruction">TO START ANALYSIS</div>

      <div className="flex-grow flex items-center justify-around">
        <LabeledIcon icon="fa-camera-retro" label={leftLabel} side="left" />
        <LabeledIcon icon="fa-image" label={rightLabel} side="right" />
      </div>

      <BackButton onClick={onBack} />
    </div>
  );
};

export default AnalysisPage;
