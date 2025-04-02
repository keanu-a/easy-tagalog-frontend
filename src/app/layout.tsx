import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Easy Tagalog',
  description: 'Learn Tagalog Easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn('relative h-full antialiased', dmSans.className)}>
        <main>{children}</main>
      </body>
    </html>
  );
}
