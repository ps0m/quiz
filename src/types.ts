export interface Option {
  letter: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  answer: string;
    answerLanguage: string;
    wordCount: number;
    theme: string; // 'football', 'dota', 'history', 'geography' і г.д.
}
