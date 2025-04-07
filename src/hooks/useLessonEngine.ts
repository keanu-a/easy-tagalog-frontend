import { useReducer } from 'react';
import { useLessonProgress } from '@/context/LessonProgressContext';
import { LessonQuestion, QuestionType } from '@/types/lessonType';

enum ActionType {
  START = 'start',
  CLICKED = 'clicked',
  CHECK = 'check',
  NEXT = 'next',
  RESTART = 'restart',
}

export enum StageType {
  NOT_READY = 'not ready',
  CONTENT = 'content',
  ANSWERING = 'answering',
  CHECKED = 'checked',
  FINISHED = 'finished',
}

type Action =
  | { type: ActionType.START }
  | {
      type: ActionType.CLICKED;
      payload: { index: number; question: LessonQuestion };
    }
  | {
      type: ActionType.CHECK;
      payload: { question: LessonQuestion };
    }
  | {
      type: ActionType.NEXT;
      payload: { isFinalContent: boolean; isFinalQuestion: boolean };
    }
  | { type: ActionType.RESTART };

interface State {
  stage: StageType;
  selectedOptions: number[];
  isUserCorrect: boolean | null;
}

const INITIAL_STATE: State = {
  stage: StageType.NOT_READY,
  selectedOptions: [],
  isUserCorrect: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.START:
      return {
        ...state,
        stage: StageType.ANSWERING,
      };

    case ActionType.CLICKED: {
      const { question, index } = action.payload;

      if (
        question.type === QuestionType.TRANSLATE_WORD ||
        question.type === QuestionType.TRANSLATE_PHRASE
      ) {
        return {
          ...state,
          selectedOptions: [index],
        };
      }

      if (question.type === QuestionType.BUILD_PHRASE) {
        // First check to see if the option was already selected
        const isAlreadySelected = state.selectedOptions.includes(index);

        return {
          ...state,
          selectedOptions: isAlreadySelected
            ? state.selectedOptions.filter((i) => i !== index)
            : [...state.selectedOptions, index],
        };
      }
    }

    case ActionType.CHECK: {
      const { question } = action.payload;
      let currentState = state;

      if (
        question.type === QuestionType.TRANSLATE_WORD ||
        question.type === QuestionType.TRANSLATE_PHRASE
      ) {
        currentState = {
          ...state,
          isUserCorrect:
            question.options[state.selectedOptions[0]].uuid === question.answer,
        };
      }

      return {
        ...currentState,
        stage: StageType.CHECKED,
      };
    }

    case ActionType.NEXT: {
      const { isFinalContent, isFinalQuestion } = action.payload;

      let nextStage = StageType.CONTENT;

      if (isFinalContent && !isFinalQuestion) {
        nextStage = StageType.ANSWERING;
      }

      if (isFinalQuestion) {
        nextStage = StageType.FINISHED;
      }

      return {
        ...state,
        selectedOptions: [],
        isUserCorrect: null,
        stage: nextStage,
      };
    }

    case ActionType.RESTART:
      return INITIAL_STATE;

    default:
      throw new Error('Unknown action type');
  }
};

export function useLessonEngine() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { setCurrentQuestion } = useLessonProgress();

  const startLesson = () => dispatch({ type: ActionType.START });

  const clickedOption = (index: number, question: LessonQuestion) => {
    dispatch({
      type: ActionType.CLICKED,
      payload: { index, question },
    });
  };

  const checkAnswer = (question: LessonQuestion) => {
    dispatch({
      type: ActionType.CHECK,
      payload: { question },
    });
  };

  const goToNextStage = (isFinalContent: boolean, isFinalQuestion: boolean) =>
    dispatch({
      type: ActionType.NEXT,
      payload: { isFinalContent, isFinalQuestion },
    });

  const restartLesson = () => {
    dispatch({ type: ActionType.RESTART });
    setCurrentQuestion(0);
  };

  const finishLesson = () => {
    // Save progress?
  };

  return {
    ...state,
    startLesson,
    clickedOption,
    checkAnswer,
    goToNextStage,
    finishLesson,
  };
}
