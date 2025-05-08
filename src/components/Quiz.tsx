import React, { FormEvent, ChangeEvent } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import './Quiz.css';

const Quiz: React.FC = () => {
  const {
    gameState,
    currentQuestion,
    userAnswer,
    setUserAnswer,
    isCorrect,
    checkAnswer,
    resetQuiz,
    startQuiz,
    showTryAgain,
  } = useQuiz();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkAnswer();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  // Пачатковы экран
  if (gameState === 'start') {
    return (
      <div className="quiz-container">
        <div className="speech-bubble">
          <h1 className="quiz-title">Віктарына</h1>
        </div>
        <button className="start-btn" onClick={startQuiz}>
                ПАЧАЦЬ
        </button>
      </div>
    );
  }

  // Экран з вынікамі
  if (gameState === 'finished') {
    return (
      <div className="quiz-container result-screen">
        <p className="congrats-text">ВІНШУЕМ!</p>
        <div className="speech-bubble">
          <h2 className="win-message">ВЫ ПЕРАМАГЛІ!</h2>
        </div>
        <div className="social-buttons">
          <button className="social-btn">👍</button>
          <button className="social-btn">💬</button>
          <button className="social-btn">➖</button>
          <button className="social-btn">➕</button>
        </div>
        <button className="start-btn" onClick={resetQuiz}>
                ГУЛЯЦЬ ЗНОЎ
        </button>
      </div>
    );
  }

  // Экран пытання
  return (
    <div className="quiz-container">
      <div className="speech-bubble">
        <h2>{currentQuestion.question}</h2>
      </div>

      <form onSubmit={handleSubmit} className="answer-form">
        <input
          type="text"
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Увядзіце адказ..."
          className="answer-input"
          disabled={isCorrect !== null}
        />

        {isCorrect === null && (
          <div className="buttons">
            <button type="submit" className="submit-btn">
                          Праверыць
            </button>
          </div>
        )}
      </form>

      {showTryAgain && (
        <div className="try-again">
          <p>Паспрабуй яшчэ!</p>
        </div>
      )}

      {isCorrect === true && (
        <div className="result correct">
          <p>Правільна!</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
