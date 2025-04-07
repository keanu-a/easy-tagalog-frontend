import { Phrase } from '@/types/phraseType';
import { Word } from '@/types/wordType';

interface LessonAnswerProps {
  isUserCorrect: boolean | null;
  answer: Word | Phrase | undefined;
}

export default function LessonAnswer({
  isUserCorrect,
  answer,
}: LessonAnswerProps) {
  return (
    <div
      className={`absolute flex flex-col items-center top-0 text-white p-4 rounded-md ${
        isUserCorrect ? 'bg-green-700' : 'bg-red-700'
      }`}
    >
      <h1 className="text-lg">{isUserCorrect ? 'Correct!' : 'Incorrect'}</h1>

      <h3 className="text-sm">
        {isUserCorrect ? '' : 'The correct answer is: '}
      </h3>
      <div className="flex justify-around w-full">{answer?.tagalog}</div>
    </div>
  );
}
