import { useLessonProgress } from '@/context/LessonProgressContext';
import { Progress } from './ui/progress';

export default function LessonProgressBar() {
  const { progress, totalQuestions } = useLessonProgress();
  return <Progress value={progress} />;
}
