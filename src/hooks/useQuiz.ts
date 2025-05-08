import { useState } from 'react';
import { Question } from '../types';

// Пытанні (на беларускай мове)
const questions: Question[] = [
  {
    id: 1,
        question: 'Ён кіраваў не толькі мячом, але і часам. Пасля яго — люты стаў карацейшы, а ліпень — імем.',
        answer: 'Цэзар',
        answerLanguage: 'беларуская',
        wordCount: 1
  },
  {
    id: 2,
      question: 'Адзін быў сімвалам справядлівасці, гуляў на полі з нумарам 2. Другі — не ведаў межаў і правілаў, яго імя стала сінонімам страху. Адзін стаў ахвярай сваёй памылкі, другі — сваёй прагі ўлады. Яны абодва сталі часткай гісторыі, але ў кожнага свой цень.',
      answer: 'Эскобар',
      answerLanguage: 'беларуская',
      wordCount: 1
  },
  {
    id: 3,
      question: 'Яна зарадзілася на востраве ў школе аднайменнага горада, але заваявала сэрцы мільёнаў на іншым кантыненце і гэтая гульня ператварылася ў рэлігію для пэўнага народа. У гэтай гульні нельга выкарыстоўваць рукі, акрамя аднаго чалавека ў кожнай камандзе.',
      answer: 'Рэгбі',
      answerLanguage: 'беларуская',
      wordCount: 1
  },
    {
        id: 4,
        question: 'Апошні прадстаўнік вымерлай расы, ён пакляўся адпомсціць за свой народ. Ён лёгка слізгае па любой мясцовасці, мае не проста зброю, а сямейную рэліквію, якая перадавалася пакаленнямі. Шляхетнае паходжанне адчуваецца ў яго манерах і мове, нават калі ён змагаецца з дзясяткам супраціўнікаў. Нягледзячы на трагічны лёс, ён захоўвае аптымізм і любоў да прыгод, заўсёды гатовы кінуцца ў самую гушчу бітвы з фірмовым воклічам.',
        answer: 'Pangolier',
        answerLanguage: 'англійская',
        wordCount: 1
    },
    {
        id: 5,
        question: 'Гэты беларускі горад быў заснаваны як манастырская слабада і атрымаў сваю назву ад ракі, на якой стаіць, назва якой у сваю чаргу перакладаецца як гаварлівая рака. Горад вядомы прызёркай Алімпіяды, а таксама навуковым цэнтрам селекцыі раслін, у якім ужо амаль 100 гадоў ствараюць новыя сарты',
      answer: 'Жодзіна',
      answerLanguage: 'беларуская',
      wordCount: 1
  }
];

export function useQuiz() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showTryAgain, setShowTryAgain] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const startQuiz = () => {
    setGameState('playing');
      setShowTooltip(true);
  };

  const checkAnswer = () => {
      // Рэгістранезалежная праверка
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
        setShowTooltip(true);
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
      setShowTooltip(true);
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
      showTryAgain,
      showTooltip
  };
}
