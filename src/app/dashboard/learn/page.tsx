'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { fetchLessons } from '@/lib/api/lesson';
import { capitilizeFirstLetter } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

function LessonCardSkeleton() {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-5 w-20" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-9 w-20" />
      </CardFooter>
    </Card>
  );
}

export default function DashboardLearn() {
  const {
    data: lessons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['lessons'],
    queryFn: fetchLessons,
  });

  if (isError) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Failed to load lessons. Please try again.
      </div>
    );
  }

  return (
    <div className="p-6 w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Lessons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <LessonCardSkeleton key={i} />
            ))
          : lessons?.map((lesson, index) => (
              <Card key={lesson.uuid} className="flex flex-col justify-between">
                <CardHeader>
                  <CardDescription>Lesson {index + 1}</CardDescription>
                  <CardTitle>{capitilizeFirstLetter(lesson.title)}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/lesson/${lesson.uuid}`}>Start</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
}
