import { useState, useCallback } from 'react';
import DemographicsPage from './components/DemographicsPage';
import LandingPage from './components/LandingPage';
import InputPage from './components/InputPage';
import ProcessingPage from './components/ProcessingPage';
import ThankYouPage from './components/ThankYouPage';
import AnalysisPage from './components/AnalysisPage';
import CameraSetupPage from './components/CameraSetupPage';
import Camera from './components/Camera';
import ImageUpload from './components/ImageUpload';
import AnalysisPrepPage from './components/AnalysisPrepPage';

function App() {
  const [history, setHistory] = useState(['landing']);
  const [userName, setUserName] = useState('');
  const [cityName, setCityName] = useState('');
  const [demographics, setDemographics] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const page = history[history.length - 1];

  const navigateTo = useCallback((page) => {
    setHistory(prevHistory => [...prevHistory, page]);
  }, []);

  const handleBack = useCallback(() => {
    setHistory(prevHistory => {
      if (prevHistory.length > 1) {
        return prevHistory.slice(0, -1);
      }
      return prevHistory;
    });
  }, []);

  const replaceAndNavigate = useCallback((page) => {
    setHistory(prevHistory => [...prevHistory.slice(0, -1), page]);
  }, []);

  const handleNameContinue = (name) => {
    setUserName(name);
    navigateTo('city');
  };

  const handleCityContinue = (city) => {
    setCityName(city);
    
    // Store data in local storage
    localStorage.setItem('skintric_user', JSON.stringify({ name: userName, location: city }));

    // Send data to the backend API
    fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: userName, location: city }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('API Success:', data);
      // Proceed to the next step
      navigateTo('processing');
    })
    .catch(error => {
      console.error('API Error:', error);
      // Still proceed to the next step to not block the user
      navigateTo('processing');
    });
  };

  const handleImageSubmit = async (imageBase64) => {
    setCapturedImage(imageBase64); // Set the captured image
    navigateTo('analysis_prep'); // 1. Immediately navigate to the loading screen

    try {
      // 2. Perform the API call in the background
      const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageBase64.split(',')[1] }),
      });

      const result = await response.json();

      if (response.ok && result.data) {
        // 3. On success, set the data and trigger the pop-up on the prep page
        setDemographics(result.data);
        setShowSuccessPopup(true);
      } else {
        console.error('API Error:', result.message || 'An unknown error occurred');
        alert('There was an error analyzing your image. Please try again.');
        handleBack();
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('There was a network error. Please check your connection and try again.');
      handleBack();
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'intro':
        return <InputPage key="intro" title="TO START ANALYSIS" placeholder="Introduce Yourself" onContinue={handleNameContinue} onBack={handleBack} />;
      case 'city':
        return <InputPage key="city" title="WHAT CITY ARE YOU IN?" placeholder="Enter your city" onContinue={handleCityContinue} onBack={handleBack} />;
            case 'processing':
        return <ProcessingPage onProcessed={() => replaceAndNavigate('thankyou')} />;
            case 'thankyou':
        return <ThankYouPage onProceed={() => navigateTo('analysis')} onBack={handleBack} />;
      case 'analysis':
        return <AnalysisPage onBack={handleBack} onAllow={() => navigateTo('camera_setup')} onUpload={() => navigateTo('upload')} />;
      case 'camera_setup':
        return <CameraSetupPage onSetupComplete={() => replaceAndNavigate('camera')} />;
      case 'camera':
        return <Camera onCapture={handleImageSubmit} onBack={handleBack} />;
      case 'upload':
        return <ImageUpload onUpload={handleImageSubmit} onBack={handleBack} />;
      case 'analysis_prep':
        return <AnalysisPrepPage 
          onBack={handleBack} 
          showPopup={showSuccessPopup} 
          onPopupOk={() => {
            setShowSuccessPopup(false);
            navigateTo('demographics');
          }}
          capturedImage={capturedImage} // Pass the image here
        />;
      case 'demographics':
        return <DemographicsPage userName={userName} demographics={demographics} onBack={handleBack} />;
      case 'landing':
      default:
        return <LandingPage onTakeTest={() => navigateTo('intro')} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;