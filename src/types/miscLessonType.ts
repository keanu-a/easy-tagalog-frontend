export interface MiscLessonContent {
  misc: any;
  content: string;
}

export enum MiscQuestionType {
  SINGLE_ANSWER = 'singleAnswer',
  MULTIPLE_ANSWER = 'multipleAnswer',
}

export interface MiscLessonQuestion {
  question: string;
  options: string[];
  answer: string[];
  questionType: MiscQuestionType;
}
