import Link from 'next/link';
import { Button } from '../ui/button';

interface LessonFinishProps {
  rightAnswered: number;
  onFinishLesson: () => void;
}

export default function LessonFinish({
  rightAnswered,
  onFinishLesson,
}: LessonFinishProps) {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <p>You answered {rightAnswered} questions correctly</p>
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
