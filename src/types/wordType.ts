import { Phrase } from "./phraseType";

export enum Tense {
  PAST = "past",
  PRESENT = "present",
  FUTURE = "future",
}

export enum PartOfSpeech {
  N = "NOUN",
  V = "VERN",
  ADJ = "ADJECTIVE",
  ADV = "ADVERB",
  PRON = "PRONOUN",
  PREP = "PREPOSITION",
  CONJ = "CONJUNCTION",
  INTERJ = "INTERJECTION",
  INTERR = "INTERROGATIVE",
  ART = "ARTICLE",
  PART = "PARTICLE",
  PRE = "PREFIX",
}

export interface Conjugation {
  tagalog: string;
  root: string;
  accents: number[];
  english: string;
  tense: Tense;
  audioUrl: string;
}

export interface LinkedWord {
  tagalog: string;
  audioUrl: string;
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
  focusType?: string;
  linkedWord?: LinkedWord;
  audioUrl: string;
  examplePhrases?: Phrase[];
}
