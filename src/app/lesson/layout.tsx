import { ReactNode } from 'react';

import LessonLayoutWrapper from '@/components/LessonLayoutWrapper';

export default function LessonLayout({ children }: { children: ReactNode }) {
  return <LessonLayoutWrapper>{children}</LessonLayoutWrapper>;
}
