'use client';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface DictionarySearchBarProps {
  className?: string;
}

export default function DictionarySearchBar({
  className,
}: DictionarySearchBarProps) {
  const [inputText, setInputText] = useState('');

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
      <Input
        className={cn('pl-10 rounded-full focus-visible:ring-0', className)}
        placeholder="Search dictionary..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </div>
  );
}
