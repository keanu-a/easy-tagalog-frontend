'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { Lesson, LessonItemType } from '@/types/lessonType';
import LessonReadyPrompt from '@/components/lesson/LessonReadyPrompt';
import { useLessonProgress } from '@/context/LessonProgressContext';
import LessonFinish from '@/components/lesson/LessonFinish';
import LessonItemContent from '@/components/lesson/LessonItemContent';

import { useLessonEngine, StageType } from '@/hooks/useLessonEngine';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import LessonLoader from '@/components/lesson/LessonLoader';

async function fetchLesson(lessonUuid: string): Promise<Lesson> {
  const res = await fetch(`/api/lessons/${lessonUuid}`);
  if (!res.ok) throw new Error('Failed to fetch lesson');
  return res.json();
}

export default function LessonPage() {
  const { lessonUuid } = useParams();
  const { setTotalLessonItems, setCurrentLessonItem } = useLessonProgress();
  const { playRightAnswer, playWrongAnswer } = useSoundEffects();

  // Setting lesson engine state machine
  const {
    stage,
    selectedOptions,
    isUserCorrect,
    rightAnswered,
    wrongAnswered,
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

  // Handles playing audio for correct or incorrect answer
  useEffect(() => {
    if (currentLessonItem?.type === LessonItemType.SCENARIO_PROMPT) return;

    if (stage === StageType.CHECKED) {
      isUserCorrect ? playRightAnswer() : playWrongAnswer();
    }
  }, [
    stage,
    isUserCorrect,
    playRightAnswer,
    playWrongAnswer,
    currentLessonItem?.type,
  ]);

  // Handles minimum timeout for lesson loading screen
  const [hasMinimumTimeElapsed, setHasMinimumTimeElapsed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHasMinimumTimeElapsed(true), 3500); // min load time
    return () => clearTimeout(timer);
  }, []);

  // Handles going to next lesson item
  const goToNext = () => {
    const isFinalLessonItem = lessonItemIndex + 1 === lesson?.items.length;

    if (stage === StageType.CHECKED) {
      setLessonItemIndex((prev) => prev + 1);
      setCurrentLessonItem((prev) => prev + 1);
      goToNextStage(isFinalLessonItem);
    }
  };

  // Page render conditions

  if (isLoading || !hasMinimumTimeElapsed) return <LessonLoader />;

  if (isError) return <div>Error loading lesson...</div>;

  // Start page render
  if (stage === StageType.NOT_READY) {
    return <LessonReadyPrompt handleStartLesson={startLesson} />;
  }

  // Finish page render
  if (stage === StageType.FINISHED) {
    return (
      <LessonFinish
        rightAnswered={rightAnswered}
        onFinishLesson={finishLesson}
      />
    );
  }

  // Main lesson render
  return (
    <>
      {currentLessonItem && (
        <LessonItemContent
          item={currentLessonItem}
          stage={stage}
          selectedOptions={selectedOptions}
          isUserCorrect={isUserCorrect}
          onOptionClick={clickedOption}
          onCheckAnswer={checkAnswer}
          onNext={goToNext}
        />
      )}
    </>
  );
}
