'use client';

import { useReducer } from 'react';

import { Button } from '@/components/ui/button';
import LessonHeader from '@/components/LessonHeader';

import ReadyPrompt from '@/components/LessonReadyPrompt';
import QuestionOption from '@/components/QuestionOption';
import LessonAnswer from '@/components/LessonAnswer';
import { LESSON_QUESTIONS } from './constants';

const DEFAULT_START_INDEX = 0;

enum ActionType {
  START = 'start',
  CLICKED = 'clicked',
  CHECK = 'check',
  CONTENT_NEXT = 'content next',
  QUESTION_NEXT = 'question next',
  RESTART = 'restart',
}

enum StageType {
  NOT_READY = 'not ready',
  CONTENT = 'content',
  ANSWERING = 'answering',
  CHECKED = 'checked',
  FINISHED = 'finished',
}

type Action =
  | { type: ActionType.START }
  | { type: ActionType.CLICKED; payload: number } // Only clicked will need a payload
  | { type: ActionType.CHECK }
  | { type: ActionType.CONTENT_NEXT }
  | { type: ActionType.QUESTION_NEXT }
  | { type: ActionType.RESTART };

interface State {
  stage: StageType;
  contentIndex: number;
  questionIndex: number;
  selectedOptions: number[];
  isUserCorrect: boolean | null;
}

const INITIAL_STATE: State = {
  stage: StageType.NOT_READY,
  contentIndex: DEFAULT_START_INDEX,
  questionIndex: DEFAULT_START_INDEX,
  selectedOptions: [],
  isUserCorrect: null,
};

const reducer = (state: State, action: Action): State => {
  const currentQuestion = LESSON_QUESTIONS[state.questionIndex];

  switch (action.type) {
    case ActionType.START:
      return {
        ...state,
        stage: StageType.CONTENT,
      };

    case ActionType.CLICKED:
      const indexClicked = action.payload;

      if (currentQuestion.questionType === QuestionType.SINGLE_ANSWER) {
        return {
          ...state,
          selectedOptions: [indexClicked],
        };
      }

      if (currentQuestion.questionType === QuestionType.MULTIPLE_ANSWER) {
        // First check to see if the option was already selected
        const isAlreadySelected = state.selectedOptions.includes(indexClicked);

        return {
          ...state,
          selectedOptions: isAlreadySelected
            ? state.selectedOptions.filter((index) => index !== indexClicked)
            : [...state.selectedOptions, indexClicked],
        };
      }

    case ActionType.CHECK:
      // First check if single answer or multiple answer

      let currentState = state;

      if (currentQuestion.questionType === QuestionType.SINGLE_ANSWER) {
        // Returns true or false if selected option matched question answer
        currentState = {
          ...state,
          isUserCorrect:
            currentQuestion.options[state.selectedOptions[0]] ===
            currentQuestion.answer[0],
        };
      }

      // Else questionType has multiple answers
      if (currentQuestion.questionType === QuestionType.MULTIPLE_ANSWER) {
        // First goes through every option the user has selected
        // Then checks the answer to make sure the selected option is apart of it
        currentState = {
          ...state,
          isUserCorrect: state.selectedOptions.every((index) =>
            currentQuestion.answer.includes(currentQuestion.options[index])
          ),
        };
      }

      return {
        ...currentState,
        stage: StageType.CHECKED,
      };

    case ActionType.CONTENT_NEXT:
      return {
        ...state,
        contentIndex: state.contentIndex + 1,
        stage:
          state.contentIndex === LESSON_CONTENT.length - 1
            ? StageType.ANSWERING
            : state.stage,
      };

    case ActionType.QUESTION_NEXT:
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        isUserCorrect: null,
        selectedOptions: [],
        stage:
          state.questionIndex === LESSON_QUESTIONS.length - 1
            ? StageType.FINISHED
            : StageType.ANSWERING,
      };

    case ActionType.RESTART:
      return INITIAL_STATE;

    default:
      throw new Error('Unknown action type');
  }
};

export default function AlphabetPage() {
  const [
    { stage, contentIndex, questionIndex, selectedOptions, isUserCorrect },
    dispatch,
  ] = useReducer(reducer, INITIAL_STATE);

  const startLesson = () => {
    dispatch({ type: ActionType.START });
  };

  const checkAnswer = () => {
    dispatch({ type: ActionType.CHECK });
  };

  const goToNext = () => {
    stage === StageType.CONTENT
      ? dispatch({ type: ActionType.CONTENT_NEXT })
      : dispatch({ type: ActionType.QUESTION_NEXT });
  };

  const addToSelectedOptions = (selectedIndex: number) => {
    dispatch({ type: ActionType.CLICKED, payload: selectedIndex });
  };

  const restartLesson = () => {
    dispatch({ type: ActionType.RESTART });
  };

  const finishLesson = () => {
    console.log('Set lesson finished by user');
  };

  return (
    <>
      {stage === StageType.NOT_READY ? (
        <ReadyPrompt handleSetReady={startLesson} />
      ) : (
        <LessonHeader
          value={
            ((contentIndex + questionIndex) * 100) /
            (LESSON_CONTENT.length + LESSON_QUESTIONS.length)
          }
          handleRestart={restartLesson}
        />
      )}
    </>
  );
}
