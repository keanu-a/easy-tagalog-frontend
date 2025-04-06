import { Phrase } from './phraseType';
import { Word } from './wordType';

export enum ContentType {
  TEXT = 'text',
  AUDIO = 'audio',
  EXAMPLE = 'example',
}

export enum QuestionType {
  TRANSLATE_WORD = 'translateWord',
  TRANSLATE_PHRASE = 'translatePhrase',
}

export interface LessonContent {
  type: ContentType;
  content: string;
  extras?: any;
}

interface TranslateWordQuestion {
  prompt: string;
  options: Word[];
  answer: string; // UUID
  type: QuestionType;
}

interface TranslatePhraseQuestion {
  prompt: string;
  options: Phrase[];
  answer: string; // UUID
  type: QuestionType;
}

export type LessonQuestion = TranslateWordQuestion | TranslatePhraseQuestion;

export interface Lesson {
  uuid: string;
  title: string;
  questions: LessonQuestion[];
}
