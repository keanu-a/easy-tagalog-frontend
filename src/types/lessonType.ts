import { Phrase } from './phraseType';
import { Word } from './wordType';

export enum ContentType {
  TEXT = 'text',
  AUDIO = 'audio',
  EXAMPLE = 'example',
}

export interface LessonContent {
  type: ContentType;
  content: string;
  extras?: any;
}

interface TranslateWordQuestion {
  type: 'translateWord';
  prompt: string;
  options: Word[];
  answer: string;
}

interface TranslatePhraseQuestion {
  type: 'translatePhrase';
  prompt: string;
  options: Phrase[];
  answer: string;
}

export type LessonQuestion = TranslateWordQuestion | TranslatePhraseQuestion;

export interface Lesson {
  uuid: string;
  title: string;
  questions: LessonQuestion[];
}
