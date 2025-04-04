'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Word } from '@/types/wordType';
import DictionaryCard from '@/components/DictionaryCard';

export default function DictionaryClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('search') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/dictionary?q=${query}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data?.error || 'An error occurred.');
          setResults([]);
        } else {
          setResults(data);
          console.log(data);
        }
      } catch (err) {
        setError('Could not connect to the server.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 min-h-[70vh]">
      {loading && <p className="text-muted-foreground">Loading...</p>}

      {error && <p className="text-ph-red">{error}</p>}

      {!loading && !error && results && (
        <ul className="space-y-2">
          {results.map((word: Word, idx) => (
            <DictionaryCard word={word} key={idx} />
          ))}
        </ul>
      )}

      {!loading && !error && query && results?.length === 0 && (
        <p className="text-muted-foreground">No results found for.</p>
      )}
    </div>
  );
}
