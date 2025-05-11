import { Word } from '@/types/wordType';
import DictionaryCard from '@/components/DictionaryCard';
import DictionarySearchBar from '@/components/DictionarySearchBar';

export default async function DictionaryPage(
  props: {
    searchParams: Promise<{ search?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams.search?.trim();

  if (!query) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Search for a word above to get started.
      </div>
    );
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/words/search/${encodeURIComponent(
        query
      )}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch dictionary data.');
    }

    const data: Word[] = await res.json();

    return (
      <div className="max-w-2xl mx-auto p-4 min-h-[70vh] space-y-4">
        <h1 className="text-center bg-ph-yellow rounded-lg p-2 shadow-md">
          Right now there are only about <span className="font-bold">200+</span>{' '}
          searchable words. More words will be added daily. Audio coming soon!
        </h1>
        <DictionarySearchBar />

        {data.length === 0 && (
          <p className="text-muted-foreground">
            No results found for
            <span className="font-bold text-ph-red"> {query}</span>
          </p>
        )}

        {data.length > 0 && (
          <ul className="flex flex-col space-y-4">
            {data.map((word: Word, idx) => (
              <DictionaryCard word={word} key={idx} />
            ))}
          </ul>
        )}
      </div>
    );
  } catch (err) {
    return (
      <div className="text-center mt-10 text-ph-red min-h-[70vh]">
        Something went wrong while fetching results.
      </div>
    );
  }
}
