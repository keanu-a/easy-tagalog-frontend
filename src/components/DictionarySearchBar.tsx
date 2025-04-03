'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface DictionarySearchBarProps {
  className?: string;
}

export default function DictionarySearchBar({
  className,
}: DictionarySearchBarProps) {
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    router.push(`/dictionary?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
      <Input
        className={cn('pl-10 rounded-full focus-visible:ring-0', className)}
        placeholder="Search dictionary..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </form>
  );
}
