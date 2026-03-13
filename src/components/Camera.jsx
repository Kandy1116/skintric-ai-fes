import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const Camera = ({ onCapture, onBack }) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  return (
    <div className="camera-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        height={720}
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: 'user'
        }}
      />
      <div className="camera-controls">
        <button onClick={onBack}>Back</button>
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
};

export default Camera;
