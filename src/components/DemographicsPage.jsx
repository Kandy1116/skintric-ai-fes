import React, { useState, useEffect } from 'react';
import DemographicsResults from './DemographicsResults';
import Sidebar from './Sidebar';
import Header from './Header';
import BackButton from './BackButton';
import './DemographicsPage.css';

const DemographicsPage = ({ userName, demographics, onBack }) => {
  const [userSelections, setUserSelections] = useState({
    race: null,
    age: null,
    gender: null,
  });

  useEffect(() => {
    if (demographics) {
      const getTopPick = (category) => {
        if (!demographics[category]) return null;
        return Object.keys(demographics[category]).reduce((a, b) =>
          demographics[category][a] > demographics[category][b] ? a : b
        );
      };
      setUserSelections({
        race: getTopPick('race'),
        age: getTopPick('age'),
        gender: getTopPick('gender'),
      });
    }
  }, [demographics]);

  const handleSelection = (category, value) => {
    setUserSelections(prev => ({ ...prev, [category]: value }));
  };

  return (
    <div className="demographics-container">
      <Sidebar userName={userName} selections={userSelections} />
      <main className="demographics-main-content">
        <Header />
        <BackButton onClick={onBack} />
        <div className="results-container">
          <h2 className="results-header">YOUR RESULTS</h2>
          <p className="results-subheader">Click on a score to update your actual attributes in the left sidebar.</p>
          {demographics ? (
            <DemographicsResults data={demographics} onSelect={handleSelection} />
          ) : (
            <p>Loading results...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DemographicsPage;
