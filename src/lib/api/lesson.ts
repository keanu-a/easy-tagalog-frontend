import { Lesson, LessonSummary } from '@/types/lessonType';

export async function fetchLesson(lessonUuid: string): Promise<Lesson> {
  const res = await fetch(`/api/lessons/${lessonUuid}`);
  if (!res.ok) throw new Error('Failed to fetch lesson');
  return res.json();
}

export async function fetchLessons(): Promise<LessonSummary[]> {
  const res = await fetch('/api/lessons');
  if (!res.ok) throw new Error('Failed to fetch lessons');
  return res.json();
}
