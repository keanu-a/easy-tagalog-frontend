import { useEffect } from 'react';

import { StageType } from '@/hooks/useLessonEngine';
import { LessonItem, LessonItemType } from '@/types/lessonType';
import { CircleCheck, CircleX, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import PhraseWordHover from '../PhraseWordHover';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface LessonItemContentProps {
  item: LessonItem;
  stage: StageType;
  selectedOptions: number[];
  isUserCorrect: boolean | null;
  onOptionClick: (index: number, lessonItem: LessonItem) => void;
  onCheckAnswer: (lessonItem: LessonItem) => void;
  onNext: () => void;
}

export default function LessonItemContent({
  item,
  stage,
  selectedOptions,
  isUserCorrect,
  onOptionClick,
  onCheckAnswer,
  onNext,
}: LessonItemContentProps) {
  const { playAudio } = useAudioPlayer();

  useEffect(() => {
    if (item.type === LessonItemType.SCENARIO_PROMPT) {
      playAudio(item.promptPhrase.audioUrl);
    }
  }, [item, playAudio]);

  const renderPrompt = () =>
    (stage === StageType.ANSWERING || stage === StageType.CHECKED) && (
      <div
        className={cn(
          'relative text-center w-full py-6 rounded-xl transition-all',
          stage === StageType.CHECKED &&
            item.type !== LessonItemType.SCENARIO_PROMPT &&
            isUserCorrect &&
            'bg-enable-correct/20',
          stage === StageType.CHECKED &&
            item.type !== LessonItemType.SCENARIO_PROMPT &&
            isUserCorrect === false &&
            'bg-ph-red/20'
        )}
      >
        {stage === StageType.CHECKED &&
          item.type !== LessonItemType.SCENARIO_PROMPT && (
            <span className="absolute left-3 top-3">
              {isUserCorrect && (
                <CircleCheck
                  size={32}
                  className="text-enable-correct"
                  aria-label="Correct answer"
                />
              )}
              {!isUserCorrect && (
                <CircleX
                  size={32}
                  className="text-ph-red"
                  aria-label="Incorrect answer"
                />
              )}
            </span>
          )}

        {item.type === LessonItemType.SCENARIO_PROMPT && (
          <div className="space-y-6 text-left">
            <h3 className="text-muted-foreground">
              Someone comes up to you and asks
            </h3>
            <div className="flex space-x-2 items-center bg-gray-200 rounded-2xl p-4 w-fit">
              <Button
                variant="ghost"
                className="py-0 px-1 cursor-pointer hover:bg-none"
                onClick={() => playAudio(item.promptPhrase.audioUrl)}
              >
                <Volume2 size={5} />
              </Button>
              <PhraseWordHover phrase={item.promptPhrase} />
            </div>
          </div>
        )}

        {(item.type === LessonItemType.TRANSLATE_WORD ||
          item.type === LessonItemType.TRANSLATE_PHRASE) && (
          <>
            <h3 className="text-muted-foreground text-lg">
              Translate to Tagalog:
            </h3>
            <h2 className="text-2xl">{item.english}</h2>
          </>
        )}

        {/* TODO: SHOW CORRECT ANSWER */}
        {/* {stage === StageType.CHECKED && !isUserCorrect && (
          <p className="mt-4 text-xl font-semibold">
            {item.options.find((op) => op.uuid === item.uuid)?.tagalog}
          </p>
        )} */}
      </div>
    );

  const renderResponse = () =>
    item.type === LessonItemType.SCENARIO_PROMPT && (
      <div className="ml-auto bg-blue-200 rounded-2xl p-4 w-fit">
        {selectedOptions.length > 0 ? (
          <PhraseWordHover phrase={item.options[selectedOptions[0]]} />
        ) : (
          <p className="border-b-1 w-20 border-black h-6"></p>
        )}
      </div>
    );

  // Renders prompt/question
  const renderOptions = () =>
    (stage === StageType.ANSWERING || stage === StageType.CHECKED) && (
      <div className="flex flex-col gap-8 justify-center items-center mt-12">
        {item.type === LessonItemType.SCENARIO_PROMPT && (
          <p>Some ways you can respond:</p>
        )}

        <div className="space-y-8">
          {item.options.map((option, idx) => (
            <Button
              key={idx}
              className={cn(
                'group relative w-[90vw] md:w-[600px] text-black p-4 text-lg bg-ph-yellow rounded-md',
                'hover:bg-ph-blue hover:text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer',
                selectedOptions.includes(idx) &&
                  'bg-ph-blue text-primary-foreground -translate-y-1'
              )}
              onClick={() => {
                onOptionClick(idx, item);
                playAudio(option.audioUrl);
              }}
              disabled={stage === StageType.CHECKED}
            >
              {item.type === LessonItemType.SCENARIO_PROMPT &&
                'english' in option && (
                  <p
                    className={cn(
                      'absolute left-1 -top-6 text-ph-blue opacity-0 group-hover:opacity-100 transition-opacity',
                      selectedOptions.includes(idx) && 'opacity-100'
                    )}
                  >
                    {option.english}
                  </p>
                )}
              {option.tagalog}
            </Button>
          ))}
        </div>
      </div>
    );

  // Renders check and next buttons
  const renderBottomButtons = () => (
    <div className="absolute bottom-0">
      <div className="h-[10vh] flex items-center">
        {stage === StageType.ANSWERING && (
          <Button
            className="cursor-pointer w-[90vw] md:w-32"
            onClick={() => onCheckAnswer(item)}
            disabled={selectedOptions.length <= 0}
          >
            {item.type === LessonItemType.SCENARIO_PROMPT ? 'Choose' : 'Check'}
          </Button>
        )}

        {stage === StageType.CHECKED && (
          <Button
            onClick={onNext}
            className={cn(
              'cursor-pointer w-[90vw] md:w-32',
              isUserCorrect && 'bg-enable-correct hover:bg-enable-correct/85',
              isUserCorrect === false && 'bg-ph-red hover:bg-ph-red/85'
            )}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative flex-1 flex flex-col h-full w-full max-w-[40rem] px-4">
      {renderPrompt()}
      {renderResponse()}
      {renderOptions()}
      {renderBottomButtons()}
    </div>
  );
}
