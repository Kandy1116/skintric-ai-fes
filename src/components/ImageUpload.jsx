import React, { useRef, useEffect } from 'react';

const ImageUpload = ({ onUpload, onBack }) => {
  const fileInputRef = useRef(null);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      fileInputRef.current.click();
      effectRan.current = true;
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      onBack();
    }
  };

  return (
    <div style={{ backgroundColor: 'black', height: '100vh' }}>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        accept="image/*" 
      />
    </div>
  );
};

export default ImageUpload;
