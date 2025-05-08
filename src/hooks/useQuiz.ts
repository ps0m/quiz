import { useState } from 'react';
import { Question } from '../types';

// Пример вопросов
const questions: Question[] = [
  {
    id: 1,
    question: 'When did Christopher Columbus discover America?',
    answer: '1492',
    hint: 'It was just before the end of the 15th century'
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    answer: 'Mars',
    hint: 'Named after the Roman god of war'
  },
  {
    id: 3,
    question: 'Who painted the Mona Lisa?',
    answer: 'Leonardo da Vinci',
    hint: 'He was an Italian polymath during the Renaissance'
  }
];

export function useQuiz() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const startQuiz = () => {
    setGameState('playing');
  };

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    return correct;
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
      setUserAnswer('');
      setShowHint(false);
      setIsCorrect(null);
    } else {
      setGameState('finished');
    }
  };

  const showQuestionHint = () => {
    setShowHint(true);
  };

  const resetQuiz = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setShowHint(false);
    setIsCorrect(null);
    setScore(0);
  };

  return {
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
    totalQuestions: questions.length,
    currentQuestionNumber: currentQuestionIndex + 1,
    score,
    startQuiz,
    resetQuiz
  };
} 