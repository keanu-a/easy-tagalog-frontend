import { StageType } from '@/hooks/useLessonEngine';
import { LessonItem, LessonItemType } from '@/types/lessonType';
import { CircleCheck, CircleX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

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
  const renderPrompt = () =>
    (stage === StageType.ANSWERING || stage === StageType.CHECKED) && (
      <div
        className={cn(
          'relative text-center w-full py-6 rounded-xl transition-all',
          stage === StageType.CHECKED &&
            isUserCorrect &&
            'bg-enable-correct/20',
          stage === StageType.CHECKED &&
            isUserCorrect === false &&
            'bg-ph-red/20'
        )}
      >
        <span className="absolute left-3 top-3">
          {stage === StageType.CHECKED && isUserCorrect && (
            <CircleCheck
              size={32}
              className="text-enable-correct"
              aria-label="Correct answer"
            />
          )}
          {stage === StageType.CHECKED && !isUserCorrect && (
            <CircleX
              size={32}
              className="text-ph-red"
              aria-label="Incorrect answer"
            />
          )}
        </span>

        {item.type === LessonItemType.SCENARIO_PROMPT && (
          <>
            <h3 className="text-muted-foreground text-lg">
              Someone comes up to you and asks
            </h3>
            <h2 className="text-2xl">{item.promptPhrase.tagalog}</h2>
          </>
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

        {stage === StageType.CHECKED && (
          <p className="mt-4 text-xl font-semibold">
            {item.options.find((op) => op.uuid === item.uuid)?.tagalog}
          </p>
        )}
      </div>
    );

  // Renders prompt/question
  const renderOptions = () =>
    (stage === StageType.ANSWERING || stage === StageType.CHECKED) && (
      <div className="flex flex-col gap-4 justify-center mt-10">
        {item.options.map((option, idx) => (
          <Button
            key={idx}
            className={cn(
              'w-[90vw] md:w-[600px] text-black p-4 text-lg bg-ph-yellow rounded-md',
              'hover:bg-ph-blue hover:text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer',
              selectedOptions.includes(idx) &&
                'bg-ph-blue text-primary-foreground -translate-y-1'
            )}
            onClick={() => onOptionClick(idx, item)}
            disabled={stage === StageType.CHECKED}
          >
            {option.tagalog}
          </Button>
        ))}
      </div>
    );

  // Renders check and next buttons
  const renderBottomButtons = () => (
    <div className="flex items-center h-[15vh] text-lg">
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

      {stage === StageType.ANSWERING && (
        <Button
          className="cursor-pointer w-[90vw] md:w-32"
          onClick={() => onCheckAnswer(item)}
          disabled={selectedOptions.length <= 0}
        >
          Check
        </Button>
      )}
    </div>
  );

  return (
    <div className="h-full w-full max-w-[40rem] px-4 flex flex-col justify-between items-center">
      {renderPrompt()}
      {renderOptions()}
      {renderBottomButtons()}
    </div>
  );
}
