import { useCallback, useRef } from 'react';

export function useSoundEffects() {
  const rightAnswerRef = useRef<HTMLAudioElement | null>(null);
  const wrongAnswerRef = useRef<HTMLAudioElement | null>(null);

  const playRightAnswer = useCallback(() => {
    if (!rightAnswerRef.current) {
      rightAnswerRef.current = new Audio('/audio/right-answer.mp3');
      rightAnswerRef.current.volume = 0.4;
    }
    rightAnswerRef.current.pause();
    rightAnswerRef.current.currentTime = 0;
    rightAnswerRef.current.play();
  }, []);

  const playWrongAnswer = useCallback(() => {
    if (!wrongAnswerRef.current) {
      wrongAnswerRef.current = new Audio('/audio/wrong-answer.mp3');
      wrongAnswerRef.current.volume = 0.4;
    }
    wrongAnswerRef.current.pause();
    wrongAnswerRef.current.currentTime = 0;
    wrongAnswerRef.current.play();
  }, []);

  return { playRightAnswer, playWrongAnswer };
}
