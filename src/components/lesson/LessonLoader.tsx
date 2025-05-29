import { useCallback, useEffect, useMemo, useState } from 'react';
import { Progress } from '../ui/progress';
import RiceBowl from '../RiceBowl';

interface LessonLoaderProps {
  minLoadingTime?: number;
}

export default function LessonLoader({
  minLoadingTime = 3000,
}: LessonLoaderProps) {
  const [loaderProgress, setLoaderProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      setLoaderProgress((prev) => {
        const elapsedTime = Date.now() - startTime;
        const targetProgress = Math.min(
          100,
          (elapsedTime / minLoadingTime) * 100
        );
        const nextProgress = Math.round(targetProgress);

        if (nextProgress >= 100) {
          clearInterval(interval);
          return 100;
        }

        return nextProgress;
      });
    }, 100); // Update every 100ms

    return interval;
  }, [minLoadingTime]);

  useEffect(() => {
    const interval = updateProgress();
    return () => clearInterval(interval);
  }, [updateProgress]);

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
