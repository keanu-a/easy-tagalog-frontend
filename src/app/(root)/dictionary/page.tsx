import { Suspense } from 'react';
import DictionaryClient from './DictionaryClient';

export default function Dictionary() {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground text-center mt-10">
          Loading dictionary...
        </div>
      }
    >
      <DictionaryClient />
    </Suspense>
  );
}
