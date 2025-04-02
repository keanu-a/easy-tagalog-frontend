import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { Separator } from './ui/separator';

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
          <Separator className="border border-gray-50" />

          <SearchBar />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
