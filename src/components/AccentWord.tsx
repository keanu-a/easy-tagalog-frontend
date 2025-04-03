import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface AccentWordProps {
  tagalog: string;
  accents?: number[];
  className?: string;
}

export default function AccentWord({
  tagalog,
  accents,
  className,
}: AccentWordProps) {
  const splitTagalog = useMemo(() => tagalog.split(''), [tagalog]);
  const accentSet = useMemo(() => new Set(accents ?? []), [accents]);

  return (
    <div className={cn('', className)}>
      {splitTagalog.map((char, idx) => (
        <span key={idx} className={accentSet.has(idx) ? 'text-ph-red' : ''}>
          {char}
        </span>
      ))}
    </div>
  );
}
