import { useEffect, useReducer, useRef } from 'react';
import { useLessonProgress } from '@/context/LessonProgressContext';
import {
  MiscLessonContent,
  MiscLessonQuestion,
  MiscQuestionType,
} from '@/types/miscLessonType';

const DEFAULT_START_INDEX = 0;

enum ActionType {
  START = 'start',
  CLICKED = 'clicked',
  CHECK = 'check',
  CONTENT_NEXT = 'content next',
  QUESTION_NEXT = 'question next',
  RESTART = 'restart',
}

export enum StageType {
  NOT_READY = 'not ready',
  CONTENT = 'content',
  ANSWERING = 'answering',
  CHECKED = 'checked',
  FINISHED = 'finished',
}

type ClickedPayload = { index: number; question: MiscLessonQuestion };
type CheckPayload = { question: MiscLessonQuestion };
type NextPayload = { lengthQuestions: number; lengthContent: number };

type Action =
  | { type: ActionType.START }
  | {
      type: ActionType.CLICKED;
      payload: ClickedPayload;
    } // Only clicked will need a payload
  | {
      type: ActionType.CHECK;
      payload: CheckPayload;
    }
  | { type: ActionType.CONTENT_NEXT; payload: NextPayload }
  | { type: ActionType.QUESTION_NEXT; payload: NextPayload }
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
  switch (action.type) {
    case ActionType.START:
      return {
        ...state,
        stage: StageType.CONTENT,
      };

    case ActionType.CLICKED: {
      const { question, index } = action.payload;

      if (question.questionType === MiscQuestionType.SINGLE_ANSWER) {
        return {
          ...state,
          selectedOptions: [index],
        };
      }

      if (question.questionType === MiscQuestionType.MULTIPLE_ANSWER) {
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

      if (question.questionType === MiscQuestionType.SINGLE_ANSWER) {
        currentState = {
          ...state,
          isUserCorrect:
            question.options[state.selectedOptions[0]] === question.answer[0],
        };
      }

      if (question.questionType === MiscQuestionType.MULTIPLE_ANSWER) {
        // First goes through every option the user has selected
        // Then checks the answer to make sure the selected option is apart of it
        currentState = {
          ...state,
          isUserCorrect: state.selectedOptions.every((index) =>
            question.answer.includes(question.options[index])
          ),
        };
      }

      return {
        ...currentState,
        stage: StageType.CHECKED,
      };
    }

    case ActionType.CONTENT_NEXT:
      const { lengthContent } = action.payload;

      return {
        ...state,
        contentIndex: state.contentIndex + 1,
        stage:
          state.contentIndex === lengthContent - 1
            ? StageType.ANSWERING
            : state.stage,
      };

    case ActionType.QUESTION_NEXT:
      const { lengthQuestions } = action.payload;

      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        isUserCorrect: null,
        selectedOptions: [],
        stage:
          state.questionIndex === lengthQuestions - 1
            ? StageType.FINISHED
            : StageType.ANSWERING,
      };

    case ActionType.RESTART:
      return INITIAL_STATE;

    default:
      throw new Error('Unknown action type');
  }
};

export function useLessonEngine({
  content,
  questions,
}: {
  content: MiscLessonContent[];
  questions: MiscLessonQuestion[];
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { setCurrentQuestion, setTotalQuestions } = useLessonProgress();

  const contentRef = useRef(content);
  const questionsRef = useRef(questions);

  const currentQuestion = questionsRef.current[state.questionIndex];

  useEffect(() => {
    setCurrentQuestion(state.contentIndex + state.questionIndex);
    setTotalQuestions(contentRef.current.length + questionsRef.current.length);
  }, [
    state.contentIndex,
    state.questionIndex,
    setCurrentQuestion,
    setTotalQuestions,
  ]);

  const startLesson = () => dispatch({ type: ActionType.START });

  const checkAnswer = () => {
    dispatch({
      type: ActionType.CHECK,
      payload: {
        question: currentQuestion,
      },
    });
  };

  const goToNext = () =>
    state.stage === StageType.CONTENT
      ? dispatch({
          type: ActionType.CONTENT_NEXT,
          payload: {
            lengthContent: contentRef.current.length,
            lengthQuestions: questionsRef.current.length,
          },
        })
      : dispatch({
          type: ActionType.QUESTION_NEXT,
          payload: {
            lengthContent: contentRef.current.length,
            lengthQuestions: questionsRef.current.length,
          },
        });

  const restartLesson = () => {
    dispatch({ type: ActionType.RESTART });
    setCurrentQuestion(0);
  };

  const addToSelectedOptions = (index: number) => {
    dispatch({
      type: ActionType.CLICKED,
      payload: {
        index,
        question: currentQuestion,
      },
    });
  };

  const finishLesson = () => {};

  return {
    ...state,
    startLesson,
    checkAnswer,
    goToNext,
    restartLesson,
    addToSelectedOptions,
    finishLesson,
  };
}
