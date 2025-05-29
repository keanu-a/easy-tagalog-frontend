export interface PhraseWord {
  position: number;
  english: string;
  note?: string;
  isProperNoun?: boolean;
  audioUrl: string;
}

export interface Phrase {
  uuid: string;
  tagalog: string;
  english: string;
  isQuestion: boolean;
  phraseWords: PhraseWord[];
  audioUrl: string;
}
