import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';
import { buttonVariants } from './ui/button';

interface ISectionLessonCardProps {
  lessonTitle: string;
  href: string;
  progress?: number;
}

export default function SectionLessonCard({
  lessonTitle,
  href,
  progress = 0,
}: ISectionLessonCardProps) {
  const sectionLessonCompleted = progress === 100;

  return (
    <div className="relative px-4 py-8 w-full bg-gray-100 shadow-md rounded-md transition-all md:w-[32rem]">
      <BadgeCheck
        className={`p-2 absolute rounded-full w-12 h-12 bg-green-500 text-ph-white -top-6 shadow-md ${
          sectionLessonCompleted ? 'visible' : 'invisible'
        }`}
      />

      <h2 className="mb-4 text-xl font-semibold">{lessonTitle}</h2>

      <p className={sectionLessonCompleted ? 'text-green-500 font-medium' : ''}>
        {sectionLessonCompleted ? 'COMPLETED' : progress + '%'}
      </p>

      <div className="flex justify-center pt-4">
        <Link
          href={href}
          className={buttonVariants({
            variant: sectionLessonCompleted ? 'destructive' : 'default',
          })}
        >
          {sectionLessonCompleted
            ? 'Revisit'
            : progress > 0
            ? 'Continue'
            : 'Start'}
        </Link>
      </div>
    </div>
  );
}
