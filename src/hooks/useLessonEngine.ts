import { useReducer } from 'react';
import { useLessonProgress } from '@/context/LessonProgressContext';
import { LessonItem, LessonItemType } from '@/types/lessonType';

enum ActionType {
  START = 'start',
  CLICKED = 'clicked',
  CHECK = 'check',
  NEXT = 'next',
  RESTART = 'restart',
}

export enum StageType {
  NOT_READY = 'not ready',
  ANSWERING = 'answering',
  CHECKED = 'checked',
  FINISHED = 'finished',
}

type Action =
  | { type: ActionType.START }
  | {
      type: ActionType.CLICKED;
      payload: { index: number; lessonItem: LessonItem };
    }
  | {
      type: ActionType.CHECK;
      payload: { lessonItem: LessonItem };
    }
  | {
      type: ActionType.NEXT;
      payload: { isFinalLessonItem: boolean };
    }
  | { type: ActionType.RESTART };

interface State {
  stage: StageType;
  selectedOptions: number[];
  isUserCorrect: boolean | null;
  rightAnswered: number;
  wrongAnswered: number;
}

const INITIAL_STATE: State = {
  stage: StageType.NOT_READY,
  selectedOptions: [],
  isUserCorrect: null,
  rightAnswered: 0,
  wrongAnswered: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.START:
      return {
        ...state,
        stage: StageType.ANSWERING,
      };

    case ActionType.CLICKED: {
      const { lessonItem, index } = action.payload;

      if (
        lessonItem.type === LessonItemType.TRANSLATE_WORD ||
        lessonItem.type === LessonItemType.TRANSLATE_PHRASE ||
        lessonItem.type === LessonItemType.SCENARIO_PROMPT
      ) {
        return {
          ...state,
          selectedOptions: [index],
        };
      }

      return state;
    }

    case ActionType.CHECK: {
      const { lessonItem } = action.payload;
      let currentState = state;

      if (
        lessonItem.type === LessonItemType.TRANSLATE_WORD ||
        lessonItem.type === LessonItemType.TRANSLATE_PHRASE
      ) {
        const isUserCorrect =
          lessonItem.options[state.selectedOptions[0]].uuid ===
          lessonItem.answer;

        currentState = {
          ...state,
          isUserCorrect: isUserCorrect,
          rightAnswered: isUserCorrect
            ? state.rightAnswered + 1
            : state.rightAnswered,
          wrongAnswered: isUserCorrect
            ? state.wrongAnswered
            : state.wrongAnswered + 1,
        };
      }

      // NOTHING TO CHECK FOR SCENARIO_PROMPT

      return {
        ...currentState,
        stage: StageType.CHECKED,
      };
    }

    case ActionType.NEXT: {
      const { isFinalLessonItem } = action.payload;

      let nextStage = StageType.ANSWERING;

      if (isFinalLessonItem) {
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
  const { setCurrentLessonItem } = useLessonProgress();

  const startLesson = () => dispatch({ type: ActionType.START });

  const clickedOption = (index: number, lessonItem: LessonItem) => {
    dispatch({
      type: ActionType.CLICKED,
      payload: { index, lessonItem },
    });
  };

  const checkAnswer = (lessonItem: LessonItem) => {
    dispatch({
      type: ActionType.CHECK,
      payload: { lessonItem },
    });
  };

  const goToNextStage = (isFinalLessonItem: boolean) =>
    dispatch({
      type: ActionType.NEXT,
      payload: { isFinalLessonItem },
    });

  const restartLesson = () => {
    dispatch({ type: ActionType.RESTART });
    setCurrentLessonItem(0);
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
