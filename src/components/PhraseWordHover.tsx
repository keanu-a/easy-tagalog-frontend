'use client';

import { useMemo, useState } from 'react';
import { Phrase } from '@/types/phraseType';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface PhraseWordHoverProps {
  phrase: Phrase;
  showToolTip?: boolean;
  className?: string;
}

export default function PhraseWordHover({
  phrase,
  showToolTip = true,
  className,
}: PhraseWordHoverProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const splitPhrase = useMemo(() => phrase.tagalog.split(' '), [phrase]);

  return (
    <TooltipProvider>
      <div className={cn('flex space-x-2', className)}>
        {splitPhrase.map((word, idx) => {
          const phraseWord = phrase.phraseWords.find(
            (pw) => pw.position === idx + 1
          );
          const isProper = phraseWord?.isProperNoun;

          // No tooltip for propoer nouns like names
          if (isProper || !phraseWord?.english) {
            return (
              <span
                key={idx}
                className="cursor-default text-black/80 font-semibold"
              >
                {word}
              </span>
            );
          }

          return (
            <span key={idx}>
              {showToolTip ? (
                <Tooltip
                  open={openIdx === idx}
                  onOpenChange={(open) => setOpenIdx(open ? idx : null)}
                >
                  <TooltipTrigger asChild>
                    <span
                      onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                      className="cursor-pointer underline font-semibold"
                    >
                      {word}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-sm max-w-36">{phraseWord.english}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                word
              )}
            </span>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
