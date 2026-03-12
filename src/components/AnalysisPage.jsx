import React, { useState } from 'react';
import Header from './Header';
import BackButton from './BackButton';
import LabeledIcon from './LabeledIcon'; // Import the new component
import ConfirmationDialog from './ConfirmationDialog'; // Import the dialog
import './InputPage.css'; // Reusing styles for squares and animations
import './LabeledIcon.css'; // Import the new component's styles

const AnalysisPage = ({ onBack }) => {
  const [showCameraDialog, setShowCameraDialog] = useState(false);
  const [showGalleryDialog, setShowGalleryDialog] = useState(false);

  const handleCameraClick = () => setShowCameraDialog(true);
  const handleGalleryClick = () => setShowGalleryDialog(true);

  const leftLabel = (
    <>
      ALLOW A.I. <br /> <span style={{ color: '#11AA1C' }}>TO SCAN YOUR FACE</span>
    </>
  );

  const rightLabel = (
    <>
      ALLOW A.I. <br /> <span style={{ color: '#11AA1C' }}>ACCESS GALLERY</span>
    </>
  );

  return (
    <div className="intro-page analysis-page flex flex-col">
      <Header />
      <div className="instruction">TO START ANALYSIS</div>

      <div className="preview-container">
        <div className="preview-label">Preview</div>
        <div className="preview-box"></div>
      </div>

      <div className="flex-grow flex items-center justify-center gap-x-[23rem]">
        <LabeledIcon icon="fa-camera-retro" label={leftLabel} side="left" onClick={handleCameraClick} />
        <LabeledIcon icon="fa-image" label={rightLabel} side="right" onClick={handleGalleryClick} />
      </div>

      {showCameraDialog && (
        <ConfirmationDialog 
          onAllow={() => setShowCameraDialog(false)} 
          onDeny={() => setShowCameraDialog(false)} 
        />
      )}

      {showGalleryDialog && (
        <ConfirmationDialog 
          onAllow={() => setShowGalleryDialog(false)} 
          onDeny={() => setShowGalleryDialog(false)} 
        />
      )}

      <BackButton onClick={onBack} />
    </div>
  );
};

export default AnalysisPage;
