'use client';

import { useParams } from 'next/navigation';

export default function LessonPage() {
  const params = useParams();
  const { lessonUuid } = params;

  return <div>page</div>;
}
