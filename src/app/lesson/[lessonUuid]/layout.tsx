'use client';

import { ReactNode } from 'react';

import LessonProgressProvider from '@/context/LessonProgressContext';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import LessonPause from '@/components/lesson/LessonPause';
import LessonProgressBar from '@/components/lesson/LessonProgressBar';

export default function LessonLayout({ children }: { children: ReactNode }) {
  return (
    <LessonProgressProvider>
      <div className="min-h-[100dvh] flex flex-col">
        <div className="sticky top-0 z-10">
          <MaxWidthWrapper>
            <div className="flex space-x-2 items-center h-[10vh]">
              <LessonPause />
              <LessonProgressBar />
            </div>
          </MaxWidthWrapper>
        </div>
        <div className="flex-1 flex justify-center items-stretch">
          <div className="w-full max-w-[40rem] flex-1 flex items-stretch justify-center">
            {children}
          </div>
        </div>
      </div>
    </LessonProgressProvider>
  );
}
