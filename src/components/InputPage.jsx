import React, { useState, useRef, useEffect } from 'react';
import './InputPage.css';

import Header from './Header';

const InputPage = ({ title, placeholder, onContinue, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setError('This field cannot be empty.');
      return;
    }
    if (/\d/.test(value)) {
      setError('Please enter a value without numbers.');
      return;
    }
    setError('');
    onContinue(value);
  };

  return (
    <div className="intro-page">
            <Header />
      <div className="instruction">{title}</div>

            <div className="center-wrapper">
        <div className="square square1"></div>
        <div className="square square2"></div>
        <div className="square square3"></div>

                <div className="intro-text" onClick={() => setIsEditing(true)}>
          {!isEditing ? (
            <>
              <div className="click-text">CLICK TO TYPE</div>
              <h1>{placeholder}</h1>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => !value && setIsEditing(false)}
                className="intro-text-input"
                style={{ width: `clamp(300px, ${value.length * 28}px, 80vw)` }}
              />
            </form>
          )}
        </div>
      </div>

      <div className="back-button" onClick={onBack}>
        <div className="diamond">
          <span>◀</span>
        </div>
        <span>BACK</span>
      </div>
      {error && <p style={{ position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)', color: 'red' }}>{error}</p>}
    </div>
  );
};

export default InputPage;
