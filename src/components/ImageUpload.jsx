import React, { useState, useCallback } from 'react';

const ImageUpload = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      onUpload(base64String);
    };
    reader.readAsDataURL(file);
  }, [onUpload]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => onDrop(e.target.files)} />
    </div>
  );
};

export default ImageUpload;
