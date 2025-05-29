'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Loader2, SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface DictionarySearchBarProps {
  className?: string;
  closeSheet?: () => void;
}

export default function DictionarySearchBar({
  className,
  closeSheet,
}: DictionarySearchBarProps) {
  const [inputText, setInputText] = useState('');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    startTransition(() => {
      router.push(`/dictionary?search=${encodeURIComponent(trimmed)}`);
      if (closeSheet) closeSheet();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {!isPending ? (
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
      ) : (
        <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" />
      )}

      <Input
        className={cn('pl-10 rounded-full focus-visible:ring-0', className)}
        placeholder="Search for a word..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </form>
  );
}
