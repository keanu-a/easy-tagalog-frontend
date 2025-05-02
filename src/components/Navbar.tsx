'use client';

import Link from 'next/link';

import MaxWidthWrapper from './MaxWidthWrapper';
import Logo from './Logo';
import DictionarySearchBar from './DictionarySearchBar';
import MobileNav from './MobileNav';
import { Button, buttonVariants } from './ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const isDictionaryPage = pathname.startsWith('/dictionary');
  // Test user
  const user = null;

  return (
    <header className="relative h-[10vh] p-4 md:p-0">
      <MaxWidthWrapper className="h-full">
        <nav className="h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="transition-all hover:text-red-600">
              <Logo />
            </Link>

            <div className={isDictionaryPage ? 'hidden' : 'hidden md:block'}>
              <DictionarySearchBar className="w-80" />
            </div>
          </div>

          <div className="flex gap-4">
            <MobileNav />

            <div className="hidden md:block">
              {user === null && (
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'rounded-full cursor-pointer'
                  )}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}
