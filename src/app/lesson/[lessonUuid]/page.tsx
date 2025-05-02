'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { Lesson, LessonItemType } from '@/types/lessonType';
import LessonReadyPrompt from '@/components/LessonReadyPrompt';
import { Button } from '@/components/ui/button';
import { useLessonProgress } from '@/context/LessonProgressContext';
import { useLessonEngine, StageType } from '@/hooks/useLessonEngine';
import { CircleCheck, CircleX } from 'lucide-react';

export async function fetchLesson(lessonUuid: string): Promise<Lesson> {
  const res = await fetch(`/api/lessons/${lessonUuid}`);
  if (!res.ok) throw new Error('Failed to fetch lesson');
  return res.json();
}

export default function LessonPage() {
  const { lessonUuid } = useParams();
  const { setTotalLessonItems, setCurrentLessonItem } = useLessonProgress();

  // Setting lesson engine state machine
  const {
    stage,
    selectedOptions,
    isUserCorrect,
    startLesson,
    clickedOption,
    checkAnswer,
    goToNextStage,
    finishLesson,
  } = useLessonEngine();

  const [lessonItemIndex, setLessonItemIndex] = useState(0);

  // Fetching lesson from database
  const {
    data: lesson,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['lesson', lessonUuid],
    queryFn: () => fetchLesson(lessonUuid as string),
    enabled: !!lessonUuid, // In case lessonUuid is undefined
  });

  const currentLessonItem = lesson?.items[lessonItemIndex];

  // Setting lesson state once fetched successfully
  useEffect(() => {
    if (!lesson) return;

    setTotalLessonItems(lesson.items.length);
  }, [lesson, setTotalLessonItems]);

  // Handles going to next lesson item
  const goToNext = () => {
    const isFinalLessonItem = lessonItemIndex + 1 === lesson?.items.length;

    if (stage === StageType.CHECKED) {
      setLessonItemIndex((prev) => prev + 1);
      setCurrentLessonItem((prev) => prev + 1);
      goToNextStage(isFinalLessonItem);
    }
  };

  const renderPrompt = () =>
    (stage === StageType.ANSWERING || stage === StageType.CHECKED) &&
    currentLessonItem ? (
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

        {currentLessonItem.type === LessonItemType.SCENARIO_PROMPT && (
          <>
            <h3 className="text-muted-foreground text-lg">
              Someone comes up to you and asks
            </h3>
            <h2 className="text-2xl">
              {currentLessonItem.promptPhrase.tagalog}
            </h2>
          </>
        )}

        {(currentLessonItem.type === LessonItemType.TRANSLATE_WORD ||
          currentLessonItem.type === LessonItemType.TRANSLATE_PHRASE) && (
          <>
            <h3 className="text-muted-foreground text-lg">
              Translate to Tagalog:
            </h3>
            <h2 className="text-2xl">{currentLessonItem.english}</h2>
          </>
        )}

        {stage === StageType.CHECKED && (
          <p className="mt-4 text-xl font-semibold">
            {
              currentLessonItem.options.find(
                (op) => op.uuid === currentLessonItem.uuid
              )?.tagalog
            }
          </p>
        )}
      </div>
    ) : null;

  // Renders prompt/question
  const renderOptions = () =>
    (stage === StageType.ANSWERING || stage === StageType.CHECKED) &&
    currentLessonItem ? (
      <div className="flex flex-col gap-4 justify-center mt-10">
        {currentLessonItem.options.map((option, idx) => (
          <Button
            key={idx}
            className={cn(
              'w-[90vw] md:w-full text-black p-4 text-lg bg-ph-yellow rounded-md',
              'hover:bg-ph-blue hover:text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer',
              selectedOptions.includes(idx) &&
                'bg-ph-blue text-primary-foreground -translate-y-1'
            )}
            onClick={() => clickedOption(idx, currentLessonItem)}
            disabled={stage === StageType.CHECKED}
          >
            {option.tagalog}
          </Button>
        ))}
      </div>
    ) : null;

  // Renders check and next buttons
  const renderBottomButtons = () => (
    <div className="flex items-center h-[15vh] text-lg">
      {stage === StageType.CHECKED && (
        <Button
          onClick={goToNext}
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
          onClick={() => currentLessonItem && checkAnswer(currentLessonItem)}
          disabled={selectedOptions.length <= 0}
        >
          Check
        </Button>
      )}
    </div>
  );

  // Page render conditions

  if (isLoading) return <div>Loading lesson...</div>;

  if (isError) return <div>Error loading lesson...</div>;

  // Start page render
  if (stage === StageType.NOT_READY) {
    return <LessonReadyPrompt handleStartLesson={startLesson} />;
  }

  // Finish page render
  if (stage === StageType.FINISHED) {
    return (
      <div className="flex flex-col items-center space-y-4 p-4">
        <div>
          Nice, you finished this lesson! Thanks for trying the demo and I hope
          you enjoyed!
        </div>
        <Link href="/">
          <Button className="cursor-pointer" onClick={finishLesson}>
            Finish
          </Button>
        </Link>
      </div>
    );
  }

  // Main lesson render
  return (
    <div className="h-full w-full max-w-[40rem] px-4 flex flex-col justify-between items-center">
      {renderPrompt()}
      {renderOptions()}
      {renderBottomButtons()}
    </div>
  );
}
