'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

type LessonProgressContextType = {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  setTotalQuestions: Dispatch<SetStateAction<number>>;
};

const LessonProgressContext = createContext<
  LessonProgressContextType | undefined
>(undefined);

export default function LessonProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(1);

  // Calculates progress based on user progress in the questions
  const progress = useMemo(
    () => (currentQuestion / totalQuestions) * 100,
    [currentQuestion, totalQuestions]
  );

  return (
    <LessonProgressContext.Provider
      value={{
        currentQuestion,
        totalQuestions,
        progress,
        setCurrentQuestion,
        setTotalQuestions,
      }}
    >
      {children}
    </LessonProgressContext.Provider>
  );
}

export function useLessonProgress() {
  const context = useContext(LessonProgressContext);

  if (!context) {
    throw new Error(
      'useLessonProgress must be used within a LessonProgressProvider'
    );
  }

  return context;
}
