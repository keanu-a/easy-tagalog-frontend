// TODO 10/24: Match frontend and backend types for all entities

export enum Tense {
  PAST = 'past',
  PRESENT = 'present',
  FUTURE = 'future',
}

export enum PartOfSpeech {
  N = 'NOUN',
  V = 'VERN',
  ADJ = 'ADJECTIVE',
  ADV = 'ADVERB',
  PRON = 'PRONOUN',
  PREP = 'PREPOSITION',
  CONJ = 'CONJUNCTION',
  INTERJ = 'INTERJECTION',
  INTERR = 'INTERROGATIVE',
  ART = 'ARTICLE',
  PART = 'PARTICLE',
  PRE = 'PREFIX',
}

export interface Conjugation {
  tagalog: string;
  root: string;
  accents: number[];
  audioUrl?: string;
  english: string;
  tense: Tense;
}

export interface LinkedWord {
  tagalog: string;
  audioUrl?: string;
}

export interface English {
  uuid: string;
  meaning: string;
}

export interface Translation {
  englishMeanings: English[];
  partOfSpeech: PartOfSpeech;
}

export interface Word {
  uuid: string;
  tagalog: string;
  translations: Translation[];
  root: string;
  accents?: number[];
  alternativeSpelling?: string;
  isIrregularVerb?: boolean;
  note?: string;
  conjugations?: Conjugation[];
  linkedWord?: LinkedWord;
  audioUrl?: string;
}
