import { useState } from 'react';
import DemographicsPage from './components/DemographicsPage';
import LandingPage from './components/LandingPage';

function App() {
  const [showDemographics, setShowDemographics] = useState(false);

  return (
    <div className="App">
      {showDemographics ? <DemographicsPage onBack={() => setShowDemographics(false)} /> : <LandingPage onTakeTest={() => setShowDemographics(true)} />}
    </div>
  );
}

export default App;

