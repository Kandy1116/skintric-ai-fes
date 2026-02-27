import { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : { name: '', location: '' };
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    if (step === 1) {
      if (!formData.name.trim() || !/^[a-zA-Z\s]+$/.test(formData.name)) {
        setError('Please enter a valid name (letters and spaces only).');
        return false;
      }
    } else if (step === 2) {
      if (!formData.location.trim() || !/^[a-zA-Z\s]+$/.test(formData.location)) {
        setError('Please enter a valid location (letters and spaces only).');
        return false;
      }
    }
    setError('');
    return true;
  };

  const nextStep = () => {
    if (validate()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setError('');
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      setApiResponse(null);
      try {
        const response = await axios.post('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', formData);
        setApiResponse({ success: true, data: response.data });
        localStorage.removeItem('formData');
        setStep(step + 1);
      } catch (err) {
        setApiResponse({ success: false, message: err.message });
      }
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">What is your name?</h1>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange('name')}
              className="w-full p-4 border-b-2 border-white bg-transparent text-white text-center text-2xl focus:outline-none"
            />
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="flex justify-center mt-8">
                <button onClick={nextStep} className="py-2 px-6 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">Proceed</button>
            </div>
          </div>
        );
      case 2:
        return (
            <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Where are you located?</h1>
            <input
              type="text"
              placeholder="New York"
              value={formData.location}
              onChange={handleChange('location')}
              className="w-full p-4 border-b-2 border-white bg-transparent text-white text-center text-2xl focus:outline-none"
            />
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={prevStep} className="py-2 px-6 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition-colors">Back</button>
              <button onClick={nextStep} className="py-2 px-6 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">Proceed</button>
            </div>
          </div>
        );
      case 3:
        return (
            <div className="w-full max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Summary</h1>
            <p className="text-xl mb-2">Name: <span className='font-bold'>{formData.name}</span></p>
            <p className="text-xl mb-6">Location: <span className='font-bold'>{formData.location}</span></p>
            {apiResponse && !apiResponse.success && <p className="text-red-500 mt-4">Error: {apiResponse.message}</p>}
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={prevStep} className="py-2 px-6 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition-colors">Back</button>
              <button onClick={handleSubmit} disabled={loading} className="py-2 px-6 bg-green-500 text-white font-bold rounded-full hover:bg-green-400 transition-colors disabled:bg-gray-400">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        );
    case 4:
        return (
            <div className="w-full max-w-md mx-auto text-center">
                <h1 className="text-3xl font-bold mb-6">Thank You!</h1>
                {apiResponse && apiResponse.success && <p className="text-green-500 text-xl">{apiResponse.data.SUCCESS}</p>}
            </div>
        )
      default:
        return <div>Form Completed</div>;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
      {renderStep()}
    </div>
  );
};

export default Form;
