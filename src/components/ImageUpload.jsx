import React from 'react';

// This is a placeholder for the original ImageUpload component.
// It was a simple, unstyled file input on a black background.
const ImageUpload = ({ onUpload, onBack }) => {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <input 
        type="file" 
        onChange={handleFileChange} 
        accept="image/*" 
      />
    </div>
  );
};

export default ImageUpload;
