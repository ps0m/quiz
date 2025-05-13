import React, { FormEvent, ChangeEvent, useState, useEffect, useRef } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import './Quiz.css';
import introImg from '../assets/intro.png';
import winnerImg from '../assets/winner.png';
import helpImg from '../assets/help.png';

const Quiz: React.FC = () => {
  const {
    gameState,
    currentQuestion,
    userAnswer,
    setUserAnswer,
    isCorrect,
    checkAnswer,
    startQuiz,
    showTryAgain,
    showTooltip,
    showHintModal,
    openHintModal,
    closeHintModal,
    currentHintTask,
    markTaskAsSent,
    hintButtonText,
  } = useQuiz();

  const [showGiftLink, setShowGiftLink] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameState === 'playing' && isCorrect === null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, isCorrect, currentQuestion]);

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    checkAnswer();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  // Пачатковы экран
  if (gameState === 'start') {
    return (
      <div className="start-container">
        <div className="intro-image-block">
          <img src={introImg} alt="Intro" className="intro-image" />
        </div>
        <div className="speech-bubble start-bubble">
          <h1 className="quiz-title start-title">Віктарына</h1>
        </div>
        <button className="start-btn" onClick={startQuiz}>
                ПАЧАЦЬ
        </button>
        <div className="start-gift-message">
                Вадзя, дзякуй табе за падарункі, мы вырашылі табе таксама зрабіць падарунак,
                але так проста не аддамо, паспрабуй забраць😁😁😁
        </div>
      </div>
    );
  }

  // Экран з вынікамі
  if (gameState === 'finished') {
    return (
      <div className="quiz-container result-screen">
        <div className="victory-image">
          <img src={winnerImg} alt="Перамога!" />
        </div>
        <p className="congrats-text">ВІНШУЕМ!</p>
        <div className="speech-bubble">
          <h2 className="win-message">ТЫ ПРАЙШОЎ НАШ QUIZ!</h2>
        </div>
        <div className="bottom-gift-block">
          {!showGiftLink && (
            <button className="start-btn" onClick={() => setShowGiftLink(true)}>
                        Забраць падарунак
            </button>
          )}
          {showGiftLink && (
            <div className="tooltip gift-tooltip">
              <a
                href={import.meta.env.VITE_GIFT_LINK || 'https://default-gift-link.com'}
                target="_blank"
                rel="noopener noreferrer"
              >
                            Вось ён, клікай!
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Экран пытання
  return (
    <div className="quiz-container">
      <div className={`theme-background theme-${currentQuestion.theme}`}></div>
      <div className="content-area">
        <div className="speech-bubble">
          <h2>{currentQuestion.question}</h2>
        </div>

        <form onSubmit={handleSubmit} className="answer-form">
          <input
            ref={inputRef}
            type="text"
            value={userAnswer}
            onChange={handleInputChange}
            placeholder="Увядзіце адказ..."
            className="answer-input"
            disabled={isCorrect !== null}
            autoFocus
          />
        </form>

        {showTooltip && (
          <div className="tooltip">
            <p>Мова адказу: <strong>{currentQuestion.answerLanguage}</strong></p>
            <p>Колькасць слоў: <strong>{currentQuestion.wordCount}</strong></p>
          </div>
        )}

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

      {isCorrect === null && (
        <div className="bottom-buttons">
          <button type="button" onClick={() => handleSubmit()} className="submit-btn">
                      Праверыць
          </button>
          <button type="button" className="hint-btn" onClick={openHintModal}>
            {hintButtonText}
          </button>
        </div>
      )}

      {showHintModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-icon" onClick={closeHintModal}>&times;</span>
            <div className="avatar-circle">
              <img src={helpImg} alt="Avatar" className="avatar-image" />
            </div>
            <h3>Патрэбная падказка?</h3>
            <p>Каб атрымаць падказку, выканай заданне і дашлі яго майстрам YODA:</p>

            <div className="task-box">
              <h4>Заданне:</h4>
              <p>{currentHintTask}</p>
            </div>

            <a
              href={import.meta.env.VITE_TELEGRAM_CHANNEL || 'https://t.me/default_channel'}
              target="_blank"
              rel="noopener noreferrer"
              className="tg-link"
            >
                          Запытаць у майстроў YODA
            </a>

            <button
              className="sent-btn"
              onClick={markTaskAsSent}
            >
                          Ужо адправіў
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
