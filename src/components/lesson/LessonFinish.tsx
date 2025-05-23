import Link from "next/link";

import { Button } from "../ui/button";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LessonItem, LessonItemType } from "@/types/lessonType";
import { motion } from "motion/react";

interface LessonFinishProps {
  rightAnswered: number;
  items: LessonItem[] | undefined;
  onFinishLesson: () => void;
}

export default function LessonFinish({
  rightAnswered,
  items,
  onFinishLesson,
}: LessonFinishProps) {
  const userAccuracy = items
    ? (rightAnswered /
        items.filter((item) => item.type !== LessonItemType.SCENARIO_PROMPT)
          .length) *
      100
    : 0;

  return (
    <div className="flex flex-col items-center space-y-4 justify-center mx-auto">
      <div className="h-36 w-36 text-ph-blue">
        <CircularProgressbarWithChildren
          value={userAccuracy}
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: "",
            trailColor: "#eee",
            pathColor: "#0032A0",
            pathTransition: "none",
          })}
        >
          <motion.p className="text-lg font-bold">{userAccuracy}%</motion.p>
          <p>Accuracy</p>
        </CircularProgressbarWithChildren>
      </div>
      <div>Thanks for trying the demo and I hope you enjoyed!</div>
      <Link href="/">
        <Button className="cursor-pointer" onClick={onFinishLesson}>
          Finish
        </Button>
      </Link>
    </div>
  );
}
