import { useState, FormEvent, ChangeEvent } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import './Quiz.css';

const Quiz = () => {
  const {
    gameState,
    currentQuestion,
    userAnswer,
    setUserAnswer,
    showHint,
    showQuestionHint,
    isCorrect,
    checkAnswer,
    nextQuestion,
    isLastQuestion,
    totalQuestions,
    currentQuestionNumber,
    score,
    startQuiz,
    resetQuiz
  } = useQuiz();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkAnswer();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  // Стартовый экран
  if (gameState === 'start') {
    return (
      <div className="quiz-container">
        <div className="speech-bubble">
          <h1 className="quiz-title">Quiz</h1>
        </div>
        <button className="start-btn" onClick={startQuiz}>
          START
        </button>
      </div>
    );
  }

  // Экран с результатами
  if (gameState === 'finished') {
    return (
      <div className="quiz-container result-screen">
        <p className="congrats-text">CONGRATULATIONS!</p>
        <div className="speech-bubble">
          <h2 className="win-message">YOU WIN!</h2>
        </div>
        <div className="social-buttons">
          <button className="social-btn">👍</button>
          <button className="social-btn">💬</button>
          <button className="social-btn">➖</button>
          <button className="social-btn">➕</button>
        </div>
        <button className="start-btn" onClick={resetQuiz}>
          PLAY AGAIN
        </button>
      </div>
    );
  }

  // Экран вопроса
  return (
    <div className="quiz-container">
      <div className="question-counter">
        Вопрос {currentQuestionNumber} из {totalQuestions}
      </div>
      
      <div className="speech-bubble">
        <h2>{currentQuestion.question}</h2>
      </div>

      <form onSubmit={handleSubmit} className="answer-form">
        <input
          type="text"
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Введите ответ..."
          className="answer-input"
          disabled={isCorrect !== null}
        />
        
        {isCorrect === null ? (
          <div className="buttons">
            <button type="submit" className="submit-btn">
              Проверить
            </button>
            {currentQuestion.hint && (
              <button
                type="button"
                onClick={showQuestionHint}
                className="hint-btn"
                disabled={showHint}
              >
                Подсказка
              </button>
            )}
          </div>
        ) : (
          <div className="buttons">
            <button
              type="button"
              onClick={nextQuestion}
              className="next-btn"
            >
              {isLastQuestion ? 'Finish' : 'Next question'}
            </button>
          </div>
        )}
      </form>

      {showHint && currentQuestion.hint && (
        <div className="hint">
          <p>Hint: {currentQuestion.hint}</p>
        </div>
      )}

      {isCorrect !== null && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <p>Correct!</p>
          ) : (
            <p>Wrong. Correct answer: {currentQuestion.answer}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz; 