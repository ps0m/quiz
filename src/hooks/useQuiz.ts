import { useState } from 'react';
import { Question } from '../types';

// Пытанні (на беларускай мове)
const questions: Question[] = [
  {
    id: 1,
    question:
            'Гэты беларускі горад быў заснаваны як манастырская слабада і атрымаў сваю назву ад ' +
            'ракі, на якой стаіць, назва якой у сваю чаргу перакладаецца як гаварлівая рака. ' +
            'Горад вядомы прызёркай Алімпіяды, а таксама навуковым цэнтрам селекцыі раслін, ' +
            'у якім ужо амаль 100 гадоў ствараюць новыя сарты',
    answer: 'Жодзіна',
    answerLanguage: 'беларуская',
    wordCount: 1,
    theme: 'belarus',
  },
  {
    id: 2,
    question:
          'Адзін быў сімвалам справядлівасці, гуляў на полі з нумарам 2. Другі — не ведаў ' +
          'межаў і правілаў, яго імя стала сінонімам страху. Адзін стаў ахвярай сваёй ' +
          'памылкі, другі — сваёй прагі ўлады. Яны абодва сталі часткай гісторыі, але ў ' +
          'кожнага свой цень.',
    answer: 'Эскобар',
    answerLanguage: 'беларуская',
    wordCount: 1,
    theme: 'latin_america',
  },
  {
    id: 3,
    question:
          'Яна зарадзілася на востраве ў школе аднайменнага горада, але заваявала сэрцы ' +
          'мільёнаў на іншым кантыненце і гэтая гульня ператварылася ў рэлігію для пэўнага ' +
          'народа. Гэтую гульню часам называюць "хуліганскай", якую гуляюць джэнтльмены.',
    answer: 'Рэгбі',
    answerLanguage: 'беларуская',
    wordCount: 1,
    theme: 'sport',
  },
  {
    id: 4,
    question:
          'Апошні прадстаўнік вымерлай расы, ён пакляўся адпомсціць за свой народ. Ён лёгка ' +
          'слізгае па любой мясцовасці, мае не проста зброю, а сямейную рэліквію, якая ' +
          'перадавалася пакаленнямі. Шляхетнае паходжанне адчуваецца ў яго манерах і мове, ' +
          'нават калі ён змагаецца з дзясяткам супраціўнікаў. Нягледзячы на трагічны лёс, ' +
          'ён захоўвае аптымізм і любоў да прыгод, заўсёды гатовы кінуцца ў самую гушчу ' +
          'бітвы з фірмовым воклічам.',
    answer: 'Pangolier',
    answerLanguage: 'англійская',
    wordCount: 1,
    theme: 'dota',
  },
  {
    id: 5,
    question:
          'Ён кіраваў не толькі мячом, але і часам. Пасля яго — люты стаў карацейшы, ' +
          'а ліпень — імем.',
    answer: 'Цэзар',
    answerLanguage: 'беларуская',
    wordCount: 1,
    theme: 'history',
  },
  {
    id: 6,
    question:
          'Ііі.. апошняе пытанне, табе дапаможа разгадэць гэты рэбус папярэдні адказ. А вось ' +
          'і тое, што патрэбна разгадаць: "СЖТВОРЕВ"',
    answer: 'Перамога',
    answerLanguage: 'беларуская',
    wordCount: 1,
    theme: 'cipher',
  },
];

// Заданні для падказак
const hintTasks = [
  'Прачытаць верш (мінімум 4 радкі)',
  'Станцаваць пад любімую песню (мінімум 30 секунд)',
  'Заспяваць куплет любімай песні жаночым голасам',
  'Зрабіць 20 прысяданняў перад камерай',
  'Зрабіць відэа з чытаннем скорагаворкі',
  'Зрабіць відэа як ты робіш 10 адцісканняў ад падлогі',
  'Станцаваць танец маленькіх лебедзяў',
  'Паказаць пантамімай як чалавек ловіць рыбу',
  'Апісаць свой сённяшні дзень наадварот (пачынаючы з канца)',
];

export function useQuiz() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showHintModal, setShowHintModal] = useState(false);
  const [currentHintTask, setCurrentHintTask] = useState('');
  const [tasksSent, setTasksSent] = useState<boolean[]>([]);
  const [hintButtonText, setHintButtonText] = useState('Запытаць падказку');
  const [hasUnlockedHint, setHasUnlockedHint] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const startQuiz = () => {
    setGameState('playing');
    setShowTooltip(true);
    // Ініцыялізуем масіў з пазнакамі выкананых заданняў
    setTasksSent(Array(hintTasks.length).fill(false));
  };

  const checkAnswer = () => {
    // Рэгістранезалежная праверка
    const correct = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

    if (correct) {
      setIsCorrect(true);
      setScore((prev) => prev + 1);

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

      // Скідваем стан падказак для новага пытання
      setCurrentHintTask('');
      setHintButtonText('Запытаць падказку');
      setHasUnlockedHint(false);
      setTasksSent(Array(hintTasks.length).fill(false));
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
    setShowHintModal(false);
    setCurrentHintTask('');
    setTasksSent(Array(hintTasks.length).fill(false));
    setHintButtonText('Запытаць падказку');
    setHasUnlockedHint(false);
  };

  const openHintModal = () => {
    // Калі заданне яшчэ не было выбрана або ўсе заданні выкананы
    // (калі кнопка паказвае "Запытаць падказку" або "Запытаць яшчэ адну падказку")
    if (!currentHintTask || hasUnlockedHint) {
      // Знаходзім першае невыкананае заданне
      const availableTasks = hintTasks.filter((_, index) => !tasksSent[index]);

      if (availableTasks.length > 0) {
        // Выбіраем выпадковае заданне з невыкананых
        const randomIndex = Math.floor(Math.random() * availableTasks.length);
        const taskIndex = hintTasks.indexOf(availableTasks[randomIndex]);

        setCurrentHintTask(hintTasks[taskIndex]);
        setHasUnlockedHint(false);

        // Абнаўляем тэкст кнопкі
        setHintButtonText('Запытаць падказку');
      }
    }

    setShowHintModal(true);
  };

  const closeHintModal = () => {
    setShowHintModal(false);
  };

  const markTaskAsSent = () => {
    // Знаходзім індэкс бягучага задання
    const taskIndex = hintTasks.indexOf(currentHintTask);

    if (taskIndex !== -1) {
      const newTasksSent = [...tasksSent];
      newTasksSent[taskIndex] = true;
      setTasksSent(newTasksSent);

      // Абазначаем, што падказка разблакавана
      setHasUnlockedHint(true);

      // Абнаўляем тэкст кнопкі
      setHintButtonText('Запытаць яшчэ адну падказку');

      // Зачыняем мадальнае акно
      closeHintModal();
    }
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
    showTooltip,
    showHintModal,
    openHintModal,
    closeHintModal,
    currentHintTask,
    markTaskAsSent,
    hasUnlockedHint,
    hintButtonText,
  };
}
