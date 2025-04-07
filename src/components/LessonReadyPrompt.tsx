'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftToLineIcon, ArrowRightToLine } from 'lucide-react';
import { Button } from './ui/button';

export default function LessonReadyPrompt({
  handleStartLesson,
}: {
  handleStartLesson: () => void;
}) {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col gap-8 mb-12 items-center justify-center">
      <p className="text-4xl">Are you ready?</p>
      <p className="text-lg">Handa ka na ba?</p>

      <div className="flex gap-4">
        <Button
          className="cursor-pointer"
          variant="destructive"
          onClick={() => router.back()}
        >
          <ArrowLeftToLineIcon />
          Back
        </Button>
        <Button className="cursor-pointer" onClick={handleStartLesson}>
          Ready
          <ArrowRightToLine />
        </Button>
      </div>
    </div>
  );
}
