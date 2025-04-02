'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Dictionary() {
  const searchParams = useSearchParams();
  const query = searchParams.get('word') || '';

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
    <div className="max-w-2xl mx-auto mt-10 p-4">
      {loading && <p className="text-muted-foreground">Loading...</p>}

      {error && <p className="text-ph-red">{error}</p>}

      {/* {!loading && !error && results && (
        <ul className="space-y-2">
          {results.map((word: any) => (
            <li key={word.id} className="p-4 border rounded-md shadow-sm">
              <p className="font-bold">{word.tagalog}</p>
              <p className="text-sm text-muted-foreground">
                {word.translations?.[0]?.englishMeanings
                  ?.map((e: any) => e.meaning)
                  .join(', ')}
              </p>
            </li>
          ))}
        </ul>
      )} */}

      {!loading && !error && query && results?.length === 0 && (
        <p className="text-muted-foreground">No results found for.</p>
      )}
    </div>
  );
}
