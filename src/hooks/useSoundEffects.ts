import { useCallback, useRef } from 'react';

export function useSoundEffects() {
  const soundEffectRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((soundPath: string) => {
    if (!soundEffectRef.current) {
      soundEffectRef.current = new Audio();
      soundEffectRef.current.volume = 0.1;
    }

    soundEffectRef.current.src = soundPath;
    soundEffectRef.current.currentTime = 0;
    soundEffectRef.current.play();
  }, []);

  return {
    playRightAnswer: () => playSound('/audio/right-answer.mp3'),
    playWrongAnswer: () => playSound('/audio/wrong-answer.mp3'),
  };
}
