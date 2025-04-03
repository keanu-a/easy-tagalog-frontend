import { Word } from '@/types/wordType';
import AccentWord from './AccentWord';
import { Volume2 } from 'lucide-react';
import { Button } from './ui/button';

interface DictionaryCardProps {
  word: Word;
}

export default function DictionaryCard({ word }: DictionaryCardProps) {
  return (
    <li className="p-4 border rounded-md shadow-sm space-y-4">
      <div className="flex space-x-4 items-center mb-6">
        <AccentWord
          tagalog={word.tagalog}
          accents={word.accents}
          className="font-bold text-3xl"
        />
        <Button className="rounded-full cursor-pointer" variant="outline">
          <Volume2 />
        </Button>
      </div>

      {word.translations.map((translation, tIdx) => (
        <div key={tIdx}>
          <p className="text-sm text-muted-foreground">
            {translation.partOfSpeech}
          </p>
          <ul className="flex flex-wrap gap-4 text-lg">
            {translation.englishMeanings.map((englishMeaning, emIdx) => (
              <li key={emIdx}>
                {emIdx > 0 && <span className="text-gray-400 mr-4">•</span>}
                {englishMeaning.meaning}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </li>
  );
}
