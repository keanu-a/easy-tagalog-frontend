import { useCallback, useRef } from 'react';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback((url: string) => {
    if (!url) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    audioRef.current.src = url;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => {
      console.warn('Failed', error);
    });
  }, []);

  return { playAudio };
}
