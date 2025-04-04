'use client';

import { cn } from '@/lib/utils';
import { useLessonEngine, StageType } from '@/hooks/useLessonEngine';
import { Button } from '@/components/ui/button';
import QuestionOption from '@/components/QuestionOption';
import LessonAnswer from '@/components/LessonAnswer';
import LessonReadyPrompt from '@/components/LessonReadyPrompt';
import { LESSON_CONTENT, LESSON_QUESTIONS } from './constants';
import { MiscQuestionType } from '@/types/miscLessonType';

export default function AlphabetPage() {
  const {
    stage,
    contentIndex,
    questionIndex,
    selectedOptions,
    isUserCorrect,
    startLesson,
    checkAnswer,
    goToNext,
    addToSelectedOptions,
    finishLesson,
  } = useLessonEngine({ content: LESSON_CONTENT, questions: LESSON_QUESTIONS });

  return (
    <>
      {stage === StageType.NOT_READY && (
        <LessonReadyPrompt handleStartLesson={startLesson} />
      )}

      {stage !== StageType.NOT_READY && (
        <div className="h-[60vh] px-4 flex flex-col justify-center items-center relative">
          {stage === StageType.CONTENT &&
            LESSON_CONTENT.map(({ misc, content }, lessonContentIndex) => (
              <div
                key={lessonContentIndex}
                className={`flex flex-col gap-4 items-center ${
                  lessonContentIndex === contentIndex ? 'block' : 'hidden'
                }`}
              >
                <h3 className="text-lg">{content}</h3>

                <ul className="flex flex-wrap gap-2 p-2 justify-center">
                  {misc.map((letter: string, letterIndex: number) => (
                    <li
                      key={letterIndex}
                      className={cn(
                        'text-base p-2 bg-slate-200 rounded-md cursor-default transition-all hover:-translate-y-2 hover:shadow-md md:text-4xl',
                        letter === 'Ñ' || letter === 'NG'
                          ? 'text-ph-red'
                          : 'text-black'
                      )}
                    >
                      {letter}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {stage === StageType.CHECKED && (
            <LessonAnswer
              isUserCorrect={isUserCorrect}
              answer={LESSON_QUESTIONS[questionIndex].answer}
              hasMultipleAnswers={
                LESSON_QUESTIONS[questionIndex].questionType ===
                MiscQuestionType.MULTIPLE_ANSWER
              }
            />
          )}

          {(stage === StageType.ANSWERING || stage === StageType.CHECKED) &&
            LESSON_QUESTIONS.map(
              (
                { question, options, answer, questionType },
                lessonQuestionIndex
              ) => (
                <div
                  className={cn(
                    lessonQuestionIndex === questionIndex ? 'block' : 'hidden'
                  )}
                  key={lessonQuestionIndex}
                >
                  <h3 className="text-lg">{question}</h3>

                  <div className="flex gap-4 justify-center mt-4">
                    {options.map((letter, optionIndex) => (
                      <QuestionOption
                        key={optionIndex}
                        optionIndex={optionIndex}
                        selectedOptions={selectedOptions}
                        isChecked={stage === StageType.CHECKED}
                        handleOptionClicked={addToSelectedOptions}
                        text={letter}
                      />
                    ))}
                  </div>
                </div>
              )
            )}

          {stage === StageType.FINISHED && (
            <div>Nice! You finished this lesson!</div>
          )}

          <div className="mt-20 absolute bottom-0 text-lg">
            {(stage === StageType.CONTENT || stage === StageType.CHECKED) && (
              <Button
                onClick={goToNext}
                className={cn(
                  isUserCorrect && 'bg-green-700 hover:bg-green-600',
                  isUserCorrect === false && 'bg-red-700 hover:bg-red-600'
                )}
              >
                Next
              </Button>
            )}

            {stage === StageType.ANSWERING && (
              <Button
                onClick={checkAnswer}
                disabled={selectedOptions.length <= 0}
              >
                Check
              </Button>
            )}

            {stage === StageType.FINISHED && (
              <Button onClick={finishLesson}>Finish</Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
