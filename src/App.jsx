import { useState } from 'react';
import Form from './components/Form';
import LandingPage from './components/LandingPage';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App">
      {showForm ? <Form /> : <LandingPage onTakeTest={() => setShowForm(true)} />}
    </div>
  );
}

export default App;
