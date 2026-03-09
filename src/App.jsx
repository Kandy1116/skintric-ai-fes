import { useState } from 'react';
import DemographicsPage from './components/DemographicsPage';
import LandingPage from './components/LandingPage';
import InputPage from './components/InputPage';
import ProcessingPage from './components/ProcessingPage';
import ThankYouPage from './components/ThankYouPage';

function App() {
  const [history, setHistory] = useState(['landing']);
  const [userName, setUserName] = useState('');
  const [cityName, setCityName] = useState('');

  const page = history[history.length - 1];

  const navigateTo = (page) => {
    setHistory(prevHistory => [...prevHistory, page]);
  };

  const handleBack = () => {
    setHistory(prevHistory => prevHistory.slice(0, -1));
  };

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

  const renderPage = () => {
    switch (page) {
      case 'intro':
        return <InputPage key="intro" title="TO START ANALYSIS" placeholder="Introduce Yourself" onContinue={handleNameContinue} onBack={handleBack} />;
      case 'city':
        return <InputPage key="city" title="WHAT CITY ARE YOU IN?" placeholder="Enter your city" onContinue={handleCityContinue} onBack={handleBack} />;
      case 'processing':
        return <ProcessingPage onProcessed={() => navigateTo('thankyou')} />;
      case 'thankyou':
        return <ThankYouPage onProceed={() => navigateTo('demographics')} onBack={handleBack} />;
      case 'demographics':
        return <DemographicsPage userName={userName} onBack={handleBack} />;
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