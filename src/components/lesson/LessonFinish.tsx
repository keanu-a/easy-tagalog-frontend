import Link from 'next/link';
import { Button } from '../ui/button';

interface LessonFinishProps {
  onFinishLesson: () => void;
}

export default function LessonFinish({ onFinishLesson }: LessonFinishProps) {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div>
        Nice, you finished this lesson! Thanks for trying the demo and I hope
        you enjoyed!
      </div>
      <Link href="/">
        <Button className="cursor-pointer" onClick={onFinishLesson}>
          Finish
        </Button>
      </Link>
    </div>
  );
}
