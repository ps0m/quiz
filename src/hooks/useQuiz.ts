import { useState } from 'react';
import { Question } from '../types';

// Пытанні (на беларускай мове)
const questions: Question[] = [
  {
    id: 1,
        question: 'Калі Хрыстафор Калумб адкрыў Амерыку?',
        answer: '1492'
  },
  {
    id: 2,
      question: 'Якая планета вядомая як Чырвоная Планета?',
      answer: 'Марс'
  },
  {
    id: 3,
      question: 'Хто намаляваў Мона Лізу?',
      answer: 'Леанарда да Вінчы'
  }
];

export function useQuiz() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
    const [showTryAgain, setShowTryAgain] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const startQuiz = () => {
    setGameState('playing');
  };

  const checkAnswer = () => {
      const correct = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
    
    if (correct) {
        setIsCorrect(true);
      setScore(prev => prev + 1);

        // Калі адказ правільны, то пераходзім далей
        setTimeout(() => {
            if (isLastQuestion) {
                setGameState('finished');
            } else {
                nextQuestion();
            }
        }, 1500);
    } else {
        // Калі адказ няправільны, то паказваем "Паспрабуй яшчэ" з анімацыяй
        setShowTryAgain(true);
        setUserAnswer('');

        // Схаваем паведамленне "Паспрабуй яшчэ" праз 2 секунды
        setTimeout(() => {
            setShowTryAgain(false);
        }, 2000);
    }
    
    return correct;
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
        setUserAnswer('');
      setIsCorrect(null);
    } else {
      setGameState('finished');
    }
  };

  const resetQuiz = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
      setUserAnswer('');
    setIsCorrect(null);
    setScore(0);
      setShowTryAgain(false);
  };

  return {
    gameState,
    currentQuestion,
    userAnswer,
      setUserAnswer,
    isCorrect,
    checkAnswer,
    nextQuestion,
    isLastQuestion,
    totalQuestions: questions.length,
    currentQuestionNumber: currentQuestionIndex + 1,
    score,
    startQuiz,
      resetQuiz,
      showTryAgain
  };
} 