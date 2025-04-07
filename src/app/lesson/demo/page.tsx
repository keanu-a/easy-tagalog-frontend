'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { LessonContent, LessonQuestion } from '@/types/lessonType';
import LessonReadyPrompt from '@/components/LessonReadyPrompt';
import { Button } from '@/components/ui/button';
import { useLessonProgress } from '@/context/LessonProgressContext';
import { useLessonEngine, StageType } from '@/hooks/useLessonEngine';
import { ArrowRight, CircleCheck, CircleX } from 'lucide-react';

export default function DemoLessonPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<LessonContent[]>([]);
  const [questions, setQuestions] = useState<LessonQuestion[]>([]);
  const [contentIndex, setContentIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setTotalQuestions, setCurrentQuestion } = useLessonProgress();

  const currentQuestion = questions[questionIndex];
  const currentContent = content[contentIndex];

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

  // Fetching lesson from database
  useEffect(() => {
    const fetchDemoLesson = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          '/api/lessons/fa2deee5-4ef5-49c7-b3b4-7a7d574eda52'
        );
        const data = await res.json();

        if (!res.ok) {
          setError(data?.error || 'An error occurred.');
        } else {
          setTitle(data.title);
          setTotalQuestions(data.questions.length);
          setQuestions(data.questions);
          setContent(data.content ? data.content : []);
        }
      } catch (err) {
        setError('Could not connect to the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchDemoLesson();
  }, [setTotalQuestions]);

  // Handles going to next page
  const goToNext = () => {
    const isFinalContent = contentIndex + 1 === content.length;
    const isFinalQuestion = questionIndex + 1 === questions.length;

    if (stage === StageType.CONTENT) {
      setContentIndex((prev) => prev + 1);
      goToNextStage(isFinalContent, false);
    }

    if (stage === StageType.CHECKED) {
      setQuestionIndex((prev) => prev + 1);
      setCurrentQuestion((prev) => prev + 1);
      goToNextStage(true, isFinalQuestion);
    }
  };

  const renderPrompt = () =>
    (stage === StageType.ANSWERING || stage === StageType.CHECKED) &&
    currentQuestion ? (
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

        <h3 className="text-muted-foreground text-lg">Translate to Tagalog:</h3>
        <h2 className="text-2xl">{currentQuestion.prompt}</h2>

        {stage === StageType.CHECKED && (
          <p className="mt-4 text-xl font-semibold">
            {
              currentQuestion.options.find(
                (op) => op.uuid === currentQuestion.answer
              )?.tagalog
            }
          </p>
        )}
      </div>
    ) : null;

  // Renders prompt/question
  const renderOptions = () =>
    (stage === StageType.ANSWERING || stage === StageType.CHECKED) &&
    currentQuestion ? (
      <div className="flex flex-col gap-4 justify-center mt-10">
        {currentQuestion.options.map((option, idx) => (
          <Button
            key={idx}
            className={cn(
              'w-[90vw] md:w-full text-black p-4 text-lg bg-ph-yellow rounded-md',
              'hover:bg-ph-blue hover:text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer',
              selectedOptions.includes(idx) &&
                'bg-ph-blue text-primary-foreground -translate-y-1'
            )}
            onClick={() => clickedOption(idx, currentQuestion)}
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
      {(stage === StageType.CONTENT || stage === StageType.CHECKED) && (
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
          onClick={() => checkAnswer(currentQuestion)}
          disabled={selectedOptions.length <= 0}
        >
          Check
        </Button>
      )}
    </div>
  );

  // Page render conditions

  if (loading) return <div>Loading lesson...</div>;

  if (error) return <div>Error loading lesson...</div>;

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
