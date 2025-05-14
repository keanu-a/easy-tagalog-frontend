import { useEffect, useState } from 'react';
import { Progress } from '../ui/progress';
import RiceBowl from '../RiceBowl';

interface LessonLoaderProps {
  minLoadingTime?: number;
}

export default function LessonLoader({
  minLoadingTime = 3000,
}: LessonLoaderProps) {
  const [loaderProgress, setLoaderProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;

    const animateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsedTime / minLoadingTime) * 100);

      setLoaderProgress(newProgress);

      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(animateProgress);
      }
    };

    animationFrame = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [minLoadingTime]);

  return (
    <div className="bg-white w-screen h-[100dvh] fixed inset-0 z-50">
      <div className="flex flex-col space-y-14 items-center justify-center h-full w-56 mx-auto">
        <RiceBowl />
        <div className="flex flex-col items-center w-full space-y-2">
          <Progress indicatorColor="bg-ph-blue" value={loaderProgress} />
          <p className="font-semibold text-muted-foreground" aria-live="polite">
            {loaderProgress < 30 && 'Preparing lesson...'}
            {loaderProgress >= 30 &&
              loaderProgress < 70 &&
              'Getting everything ready...'}
            {loaderProgress >= 70 && 'Almost there...'}
          </p>
        </div>
      </div>
    </div>
  );
}
