export interface Option {
  letter: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  answer: string;
  hint?: string;
}
