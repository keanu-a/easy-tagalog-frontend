export interface PhraseWord {
  position: number;
  english: string;
  note?: string;
  isProperNoun?: boolean;
}

export interface Phrase {
  uuid: string;
  tagalog: string;
  english: string;
  isQuestion: boolean;
  phraseWords: PhraseWord[];
}
