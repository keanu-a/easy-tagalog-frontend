import { useLessonProgress } from '@/context/LessonProgressContext';
import { Progress } from '../ui/progress';

export default function LessonProgressBar() {
  const { progress } = useLessonProgress();
  return (
    <Progress
      aria-label="Lesson progress bar"
      value={progress}
      indicatorColor={progress === 100 ? 'bg-enable-correct' : ''}
    />
  );
}
