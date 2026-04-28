import Link from 'next/link';

import { Button } from '../ui/button';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LessonItem, LessonItemType } from '@/types/lessonType';
import { motion } from 'motion/react';

interface LessonFinishProps {
  rightAnswered: number;
  items: LessonItem[] | undefined;
  onFinishLesson: () => void;
  isAuthenticated: boolean;
}

export default function LessonFinish({
  rightAnswered,
  items,
  onFinishLesson,
  isAuthenticated,
}: LessonFinishProps) {
  const userAccuracy = items
    ? Math.round(
        (rightAnswered /
          items.filter((item) => item.type !== LessonItemType.SCENARIO_PROMPT)
            .length) *
          1000,
      ) / 10
    : 0;

  return (
    <div className="flex flex-col items-center space-y-4 justify-center text-center mx-auto">
      <div className="h-36 w-36 text-ph-blue">
        <CircularProgressbarWithChildren
          value={userAccuracy}
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: '',
            trailColor: '#eee',
            pathColor: '#0032A0',
            pathTransition: 'none',
          })}
        >
          <motion.p className="text-lg font-bold">{userAccuracy}%</motion.p>
          <p>Accuracy</p>
        </CircularProgressbarWithChildren>
      </div>

      {isAuthenticated ? (
        <p>
          Great job completing the lesson! Your progress has been saved, so you
          can continue learning anytime. See you in the next lesson!
        </p>
      ) : (
        <p>Thanks for trying the demo and I hope you enjoyed!</p>
      )}

      <Link href={isAuthenticated ? '/dashboard/learn' : '/'} className="w-max">
        <Button className="cursor-pointer" onClick={onFinishLesson}>
          Finish
        </Button>
      </Link>
    </div>
  );
}
