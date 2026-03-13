import React, { useState, useRef, useEffect } from 'react';
import './InputPage.css';

import Header from './Header';

import BackButton from './BackButton';

const InputPage = ({ title, placeholder, onContinue, onBack }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
    <div className="intro-page text-input-page">
            <Header />
      <div className="instruction">{title}</div>

            <div className="center-wrapper">
        <div className="square square1"></div>
        <div className="square square2"></div>
        <div className="square square3"></div>

                <div className="intro-text">
            <form onSubmit={handleSubmit}>
              <div className="click-to-type">CLICK TO TYPE</div>
              <input
                  ref={inputRef}
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="intro-text-input"
                  style={{ width: `clamp(300px, calc(${Math.max(value.length, placeholder.length)}ch + 4px), 450px)` }}
                />
            </form>
        </div>
      </div>

            <BackButton onClick={onBack} />
      {error && <p style={{ position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)', color: 'red' }}>{error}</p>}
    </div>
  );
};

export default InputPage;
