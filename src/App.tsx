import { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';

function App() {
  return (
    <div className="app">
      <div className="characters">
        <div className="mary-poppins">
          <div className="mary-head"></div>
          <div className="mary-hat"></div>
          <div className="mary-body"></div>
          <div className="mary-skirt"></div>
          <div className="mary-umbrella"></div>
        </div>
        <div className="little-prince">
          <div className="prince-head"></div>
          <div className="prince-hair"></div>
          <div className="prince-body"></div>
          <div className="prince-cape"></div>
          <div className="prince-legs"></div>
          <div className="prince-planet"></div>
        </div>
      </div>
      <div className="phone-frame">
        <div className="dots-pattern"></div>
        <Quiz />
      </div>
    </div>
  );
}

export default App; 