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
  BUILD_PHRASE = 'buildPhrase',
}

export enum LessonItemType {
  SCENARIO_PROMPT = 'scenarioPrompt',
  TRANSLATE_WORD = 'translateWord',
  TRANSLATE_PHRASE = 'translatePhrase',
}

export interface LessonContent {
  type: ContentType;
  content: string;
  extras?: any;
}

interface ScenarioPromptItem {
  type: '';
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
  content?: LessonContent[];
  questions: LessonQuestion[];
}
