import React from 'react';
import './App.css';
import Quiz from './components/Quiz';

function App() {
  return (
      <div className="app">
      <div className="phone-frame">
        <div className="dots-pattern"></div>
        <Quiz />
      </div>
    </div>
  );
}

export default App; 