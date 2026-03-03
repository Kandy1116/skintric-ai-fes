import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import DemographicsResults from './DemographicsResults';
import Sidebar from './Sidebar';

const DemographicsPage = ({ onBack }) => {
  const [demographics, setDemographics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleUpload = async (base64Image) => {
    setIsLoading(true);
    setError(null);
    setDemographics(null); // Clear previous results
    try {
      const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();

      if (data.success) {
        setDemographics(data.data);
      } else {
        setError(data.message || 'An unknown error occurred.');
      }
    } catch (err) {
      setError('Failed to fetch demographics. Please check your connection.');
    }
    setIsLoading(false);
  };

  const handleSelection = (category, value) => {
    setUserSelections(prev => ({ ...prev, [category]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar selections={userSelections} />
      <main className="flex-1 p-[8px]">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">A.I. Demographics</h1>
            <p className="text-gray-500">Upload a photo to begin analysis.</p>
          </div>
          <button onClick={onBack} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
            Back to Home
          </button>
        </header>

        <ImageUpload onUpload={handleUpload} isLoading={isLoading} />

        {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

        {demographics && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">YOUR RESULTS</h2>
            <p className="text-gray-500 mb-6">Click on a score to update your actual attributes in the left sidebar.</p>
            <DemographicsResults data={demographics} onSelect={handleSelection} />
          </div>
        )}
      </main>
    </div>

  );
};

export default DemographicsPage;
