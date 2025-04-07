'use client';

import LessonAnswer from '@/components/LessonAnswer';
import LessonReadyPrompt from '@/components/LessonReadyPrompt';
import { Button } from '@/components/ui/button';
import { useLessonProgress } from '@/context/LessonProgressContext';
import { useLessonEngine, StageType } from '@/hooks/useLessonEngine';
import { cn } from '@/lib/utils';
import { LessonContent, LessonQuestion } from '@/types/lessonType';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DemoLessonPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<LessonContent[]>([]);
  const [questions, setQuestions] = useState<LessonQuestion[]>([]);
  const [contentIndex, setContentIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentQuestion = questions[questionIndex];
  const currentContent = content[contentIndex];

  const { setTotalQuestions, setCurrentQuestion } = useLessonProgress();

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
          '/api/lessons/c4df94e3-e41b-45ad-9dfb-ea49cf82a156'
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

  const renderAnswer = () =>
    stage === StageType.CHECKED && currentQuestion ? (
      <LessonAnswer
        isUserCorrect={isUserCorrect}
        answer={currentQuestion.options.find(
          (op) => op.uuid === currentQuestion.answer
        )}
      />
    ) : null;

  const renderQuestion = () =>
    (stage === StageType.ANSWERING || stage === StageType.CHECKED) &&
    currentQuestion ? (
      <div>
        <h3>{currentQuestion.prompt}</h3>
        <h3>Translate</h3>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {currentQuestion.options.map((option, idx) => (
            <Button
              key={idx}
              className={cn(
                'text-black p-4 text-lg bg-ph-yellow rounded-md',
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
      </div>
    ) : null;

  const renderBottomButtons = () => (
    <div className="mt-20 absolute bottom-0 text-lg">
      {(stage === StageType.CONTENT || stage === StageType.CHECKED) && (
        <Button
          onClick={goToNext}
          className={cn(
            'cursor-pointer',
            isUserCorrect && 'bg-green-700 hover:bg-green-600',
            isUserCorrect === false && 'bg-red-700 hover:bg-red-600'
          )}
        >
          Next
        </Button>
      )}

      {stage === StageType.ANSWERING && (
        <Button
          className="cursor-pointer"
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
      <div className="flex flex-col items-center space-y-4">
        <div>Nice! You finished this lesson!</div>
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
    <div className="h-[60vh] px-4 flex flex-col justify-center items-center relative">
      {renderAnswer()}
      {renderQuestion()}
      {renderBottomButtons()}
    </div>
  );
}
