'use client';

import LessonProgressProvider from '@/context/LessonProgressContext';
import MaxWidthWrapper from './MaxWidthWrapper';
import LessonPause from './LessonPause';
import LessonProgressBar from './LessonProgressBar';

export default function LessonLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LessonProgressProvider>
      <MaxWidthWrapper>
        <div className="flex space-x-2 items-center h-[15vh] mx-2">
          <LessonPause />
          <LessonProgressBar />
        </div>
        <div className="h-[65vh] flex items-center justify-center">
          {children}
        </div>
      </MaxWidthWrapper>
    </LessonProgressProvider>
  );
}
