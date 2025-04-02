import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';

import Logo from './Logo';
import SearchBar from './DictionarySearchBar';

export default function MobileNav() {
  return (
    <nav className="md:hidden flex items-center">
      <Sheet>
        <SheetTrigger className="cursor-pointer">
          <MenuIcon className="transition-all hover:text-ph-red" />
        </SheetTrigger>

        <SheetContent
          side="top"
          className="flex flex-col gap-6 bg-white h-[30vh] p-4 md:hidden"
        >
          <Logo />

          <SearchBar />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
