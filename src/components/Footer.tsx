import Link from 'next/link';

import Logo from './Logo';
import MaxWidthWrapper from './MaxWidthWrapper';

const FOOTER_LINKS = [
  {
    header: 'Company',
    pages: [
      {
        text: 'About Us',
        url: '/about-us',
      },
      {
        text: 'Contact Us',
        url: '/contact-us',
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
    <footer className="bg-yellow-100">
      <MaxWidthWrapper className="flex flex-col justify-around items-center gap-8 px-2 py-10 md:flex-row md:h-64">
        <div className="flex flex-col items-center">
          <Link href="/">
            <Logo size={180} />
          </Link>
          <p className="text-sm">Easy Tagalog © 2025. All rights reserved.</p>
        </div>

        <div className="flex flex-row space-x-8">
          {FOOTER_LINKS.map(({ header, pages }, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-bold tracking-tight">{header}</h3>

              <div className="flex flex-col space-y-1">
                {pages.map(({ text, url }, footerLinkIndex) => (
                  <Link
                    href={url}
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
      </MaxWidthWrapper>
    </footer>
  );
}
