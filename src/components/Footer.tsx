import Link from 'next/link';

import Logo from './Logo';
import MaxWidthWrapper from './MaxWidthWrapper';
import DictionarySearchBar from './dictionary/DictionarySearchBar';

const FOOTER_LINKS = [
  {
    header: 'Company',
    pages: [
      {
        text: 'About',
        url: '/about',
      },
      {
        text: 'Contact',
        url: '/contact',
      },
    ],
  },
  {
    header: 'Get Started',
    pages: [
      {
        text: 'Learn',
        url: '/learn',
      },
      {
        text: 'Translate',
        url: '/translate',
      },
      {
        text: 'Lessons',
        url: '/lessons',
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <MaxWidthWrapper className="flex flex-col space-y-16 bg-ph-yellow/20 rounded-t-4xl py-5 px-10 shadow-lg sm:py-10 md:flex-row">
        <div className="flex flex-col space-y-2">
          <Link href="/">
            <Logo size={200} />
          </Link>
          <div className="flex flex-col justify-between">
            <DictionarySearchBar className="bg-white" />
            <p className="text-sm hidden mt-10 sm:block">
              Easy Tagalog © 2025. All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-12 space-x-24 sm:flex-row sm:ml-auto">
          {FOOTER_LINKS.map(({ header, pages }, i) => (
            <div key={i} className="space-y-6">
              <h3 className="font-bold tracking-tight text-2xl md:text-xl">
                {header}
              </h3>

              <div className="flex flex-col space-y-4 text-xl md:text-lg md:space-y-2">
                {pages.map(({ text, url }, footerLinkIndex) => (
                  <Link
                    href="/"
                    // href={url}
                    key={footerLinkIndex}
                    className="transition-all hover:text-ph-red"
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground sm:hidden">
          Easy Tagalog © 2025. All rights reserved.
        </p>
      </MaxWidthWrapper>
    </footer>
  );
}
