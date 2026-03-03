import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onUpload, isLoading }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        const base64String = reader.result.split(',')[1];
        onUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: 'image/*',
    multiple: false,
  });

  return (
    <div 
      {...getRootProps()} 
      className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}>
      <input {...getInputProps()} />
      {isLoading ? (
        <p className="text-gray-600">Analyzing...</p>
      ) : preview ? (
        <img src={preview} alt="Preview" className="max-h-60 mx-auto rounded-lg" />
      ) : (
        <p className="text-gray-500">Drag & drop an image here, or click to select one.</p>
      )}
    </div>
  );
};

export default ImageUpload;
