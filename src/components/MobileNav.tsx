'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';

import Logo from './Logo';
import SearchBar from './DictionarySearchBar';
import { useState } from 'react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="md:hidden flex items-center">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="cursor-pointer">
          <MenuIcon className="transition-all hover:text-ph-red" />
        </SheetTrigger>

        <SheetContent
          side="top"
          className="flex flex-col gap-6 bg-white h-[30vh] p-4 md:hidden"
        >
          <Logo />

          <SearchBar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
