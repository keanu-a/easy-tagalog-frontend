import Link from 'next/link';

import MaxWidthWrapper from './MaxWidthWrapper';
import Logo from './Logo';
import DictionarySearchBar from './DictionarySearchBar';
import MobileNav from './MobileNav';
import { Button } from './ui/button';

export default function Navbar() {
  // Test user
  const user = null;

  return (
    <header className="relative bg-white h-[10vh] border-b border-gray-200">
      <MaxWidthWrapper className="h-full">
        <nav className="h-full flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="transition-all hover:text-red-600">
              <Logo />
            </Link>

            <div className="hidden md:block">
              <DictionarySearchBar className="w-80" />
            </div>
          </div>

          <div className="flex gap-4">
            <MobileNav />

            <div className="hidden md:block">
              {user === null && (
                <Button className="rounded-full cursor-pointer">
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}
