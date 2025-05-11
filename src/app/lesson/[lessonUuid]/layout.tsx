'use client';

import { ReactNode } from 'react';

import LessonProgressProvider from '@/context/LessonProgressContext';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import LessonPause from '@/components/lesson/LessonPause';
import LessonProgressBar from '@/components/lesson/LessonProgressBar';

export default function LessonLayout({ children }: { children: ReactNode }) {
  return (
    <LessonProgressProvider>
      <MaxWidthWrapper>
        <div className="flex space-x-2 items-center h-[10vh] mx-2">
          <LessonPause />
          <LessonProgressBar />
        </div>
        <div className="h-[80vh] flex items-center justify-center">
          {children}
        </div>
      </MaxWidthWrapper>
    </LessonProgressProvider>
  );
}
