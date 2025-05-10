import React, { FormEvent, ChangeEvent, useState } from 'react';
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
      showTooltip,
      showHintModal,
      openHintModal,
      closeHintModal,
      currentHintTask,
      markTaskAsSent,
      hasUnlockedHint,
      hintButtonText
  } = useQuiz();

    const [showGiftLink, setShowGiftLink] = useState(false);

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
            <div className="speech-bubble start-bubble">
                <h1 className="quiz-title start-title">Віктарына</h1>
        </div>
        <button className="start-btn" onClick={startQuiz}>
                ПАЧАЦЬ
        </button>
      </div>
    );
  }

  // Экран з вынікамі
    if (true) {
    return (
      <div className="quiz-container result-screen">
            <div className="victory-image">
                <img src="/victory.jpg" alt="Перамога!" />
            </div>
        <p className="congrats-text">ВІНШУЕМ!</p>
        <div className="speech-bubble">
          <h2 className="win-message">ВЫ ПЕРАМАГЛІ!</h2>
        </div>
            <div className="bottom-gift-block">
                {!showGiftLink && (
                    <button className="start-btn" onClick={() => setShowGiftLink(true)}>
                        Забраць падарунак
                    </button>
                )}
                {showGiftLink && (
                    <div className="tooltip gift-tooltip">
                        <a href="https://your-gift-link.com" target="_blank" rel="noopener noreferrer">
                            Вось ваш падарунак!
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
                      type="text"
                      value={userAnswer}
                      onChange={handleInputChange}
                      placeholder="Увядзіце адказ..."
                      className="answer-input"
                      disabled={isCorrect !== null}
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
                          <img src="/avatar.svg" alt="Avatar" className="avatar-image" />
                      </div>
                      <h3>Патрэбная падказка?</h3>
                      <p>Каб атрымаць падказку, выканай заданне і дашлі яго майстрам YODA:</p>

                      <div className="task-box">
                          <h4>Заданне:</h4>
                          <p>{currentHintTask}</p>
                      </div>

                      <a
                          href="https://t.me/your_channel_name"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tg-link"
                      >
                          Перайсці ў Telegram
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
