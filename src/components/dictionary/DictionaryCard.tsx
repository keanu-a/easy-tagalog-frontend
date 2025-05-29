'use client';

import { Word } from '@/types/wordType';
import AccentWord from '../AccentWord';
import PhraseWordHover from '../PhraseWordHover';
import { Button } from '../ui/button';
import { Volume2 } from 'lucide-react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useMutation } from '@tanstack/react-query';
import { fetchWordAudioUrl } from '@/lib/api/audio';

interface DictionaryCardProps {
  word: Word;
}

export default function DictionaryCard({ word }: DictionaryCardProps) {
  const { playAudio } = useAudioPlayer();

  const { mutate: fetchAndPlayAudio } = useMutation({
    mutationFn: fetchWordAudioUrl,
    onSuccess: (audioUrl) => {
      if (audioUrl) playAudio(audioUrl);
    },
  });

  return (
    <li className="p-4 border rounded-md shadow-sm space-y-4 relative">
      <div className="flex space-x-2 items-center mb-6">
        <AccentWord
          tagalog={word.tagalog}
          accents={word.accents}
          className="font-bold text-3xl"
        />
        <Button
          className="rounded-full px-2 cursor-pointer"
          variant="outline"
          onClick={() => fetchAndPlayAudio(word.audioUrl)}
        >
          <Volume2 />
        </Button>
      </div>

      {word.root && (
        <div className="absolute top-4 right-4 flex space-x-2 items-center">
          <p className="text-sm text-muted-foreground">ROOT:</p>
          <p className="text-lg">{word.root}</p>
        </div>
      )}

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

      {word.note && (
        <div className="text-sm">
          <p className="text-muted-foreground">NOTE:</p>
          <p>{word.note}</p>
        </div>
      )}

      {word.linkedWord && (
        <div>
          <p className="text-sm text-muted-foreground">WITH LINKER -NG</p>
          <div>
            <p className="text-lg">{word.linkedWord.tagalog}</p>
            {/* TODO: ADD IN AUDIO FOR LINKED WORDS WHEN READY */}
            {/* <Button className="rounded-full cursor-pointer" variant="outline">
                  <Volume2 />
                </Button> */}
          </div>
        </div>
      )}

      {word.alternativeSpelling && (
        <div>
          <p className="text-sm text-muted-foreground">ALTERNATE SPELLING</p>
          <p className="text-lg">{word.alternativeSpelling}</p>
        </div>
      )}

      {word.conjugations && (
        <div className="mt-4 pt-2 border-t border-muted space-y-2">
          {word.focusType && (
            <div className="flex text-sm space-x-2 items-center">
              <p className="text-muted-foreground">FOCUS:</p>
              <p>{word.focusType}</p>
            </div>
          )}
          <h2 className="font-bold text-ph-red">Conjugations</h2>
          <ul>
            {word.conjugations.map((conjugation, idx) => (
              <li key={idx} className="flex space-x-2 items-center">
                <p className="font-semibold">{conjugation.tense}:</p>
                <AccentWord
                  tagalog={conjugation.tagalog}
                  accents={conjugation.accents}
                />
                <Button
                  variant="ghost"
                  className="py-0 px-1 cursor-pointer hover:bg-none"
                  onClick={() => fetchAndPlayAudio(conjugation.audioUrl)}
                >
                  <Volume2 size={5} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {word.examplePhrases && (
        <div className="mt-4 pt-2 border-t border-muted space-y-4">
          <h2 className="font-bold text-ph-red">Examples</h2>
          <ul className="space-y-4 list-disc">
            {word.examplePhrases.map((phrase, idx) => (
              <li
                key={idx}
                className="flex flex-col border-l-2 border-muted pl-2"
              >
                <div className="flex space-x-2 items-center">
                  <Button
                    variant="ghost"
                    className="py-0 px-1 cursor-pointer hover:bg-none"
                    onClick={() => fetchAndPlayAudio(phrase.audioUrl)}
                  >
                    <Volume2 size={5} />
                  </Button>
                  <PhraseWordHover phrase={phrase} />
                </div>
                <p className="text-muted-foreground italic pl-2">
                  - {phrase.english}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
