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
  currentLessonItem: number;
  totalLessonItems: number;
  progress: number;
  setCurrentLessonItem: Dispatch<SetStateAction<number>>;
  setTotalLessonItems: Dispatch<SetStateAction<number>>;
};

const LessonProgressContext = createContext<
  LessonProgressContextType | undefined
>(undefined);

export default function LessonProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentLessonItem, setCurrentLessonItem] = useState(0);
  const [totalLessonItems, setTotalLessonItems] = useState(0);

  // Calculates progress based on user progress in the questions
  // Caps at 100% incase calculation goes over
  const progress = useMemo(() => {
    if (totalLessonItems === 0) return 0;
    const prog = (currentLessonItem / totalLessonItems) * 100;
    return Math.min(100, prog);
  }, [currentLessonItem, totalLessonItems]);

  return (
    <LessonProgressContext.Provider
      value={{
        currentLessonItem,
        totalLessonItems,
        progress,
        setCurrentLessonItem,
        setTotalLessonItems,
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
