'use client';

import { ReactNode } from 'react';

import LessonProgressProvider from '@/context/LessonProgressContext';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import LessonPause from '@/components/LessonPause';
import LessonProgressBar from '@/components/LessonProgressBar';

export default function LessonLayout({ children }: { children: ReactNode }) {
  return (
    <LessonProgressProvider>
      <MaxWidthWrapper>
        <div className="flex space-x-2 items-center h-[15vh] mx-2">
          <LessonPause />
          <LessonProgressBar />
        </div>
        <div className="h-[85vh] flex items-center justify-center">
          {children}
        </div>
      </MaxWidthWrapper>
    </LessonProgressProvider>
  );
}
