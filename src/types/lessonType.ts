import { Phrase } from './phraseType';
import { Word } from './wordType';

export enum LessonItemType {
  TRANSLATE_WORD = 'translateWord',
  TRANSLATE_PHRASE = 'translatePhrase',
  SCENARIO_PROMPT = 'scenarioPrompt',
}

interface BaseLessonItem {
  uuid: string;
  type: LessonItemType;
}

export interface TranslateWordQuestion extends BaseLessonItem {
  type: LessonItemType.TRANSLATE_WORD;
  english: string;
  options: Word[];
  answer: string; // UUID
}

export interface TranslatePhraseQuestion extends BaseLessonItem {
  type: LessonItemType.TRANSLATE_PHRASE;
  english: string;
  options: Phrase[];
  answer: string; // UUID
}

export interface ScenarioPromptItem extends BaseLessonItem {
  type: LessonItemType.SCENARIO_PROMPT;
  promptPhrase: Phrase;
  options: Phrase[];
}

export type LessonItem =
  | ScenarioPromptItem
  | TranslateWordQuestion
  | TranslatePhraseQuestion;

export interface Lesson {
  uuid: string;
  title: string;
  items: LessonItem[];
}

export interface LessonSummary {
  uuid: string;
  title: string;
}
