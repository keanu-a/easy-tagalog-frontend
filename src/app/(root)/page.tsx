import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  Search,
  Layers3,
  Repeat,
  Sparkles,
  BarChart2,
  SquareStack,
} from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const ADDITIONAL_INFO = [
  {
    title: 'Filipino Customs & Etiquette',
    text: 'Learn how to navigate respectful communication, greetings, and social norms.',
  },
  {
    title: 'Traditional Food & Dishes',
    text: 'From adobo to halo-halo, discover the flavors that define Filipino identity.',
  },
  {
    title: 'Key Geography & Regions',
    text: 'Understand where Tagalog is spoken and how language varies across regions.',
  },
  {
    title: 'Cultural Slang & Everyday Speech',
    text: 'Go beyond the textbook with real conversational Tagalog and expressions.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground px-4 pb-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-6 min-h-[80vh]">
        <div className="flex flex-col text-md sm:text-lg">
          The easiest way to learn
          <span className="text-6xl sm:text-9xl font-black tracking-tighter bg-gradient-to-r from-ph-blue via-ph-yellow to-ph-red bg-clip-text text-transparent">
            TAGALOG
          </span>
        </div>

        <p className="text-md sm:text-lg text-muted-foreground max-w-xl mx-auto">
          Learn Tagalog the modern way. Built for language learners who want
          structure, clarity, and real examples.
        </p>

        <div className="flex space-x-2 justify-center">
          <Link href="/dictionary">
            <Button className="rounded-full cursor-pointer">
              Start Learning
            </Button>
          </Link>
          <Link href="/dictionary">
            <Button variant="outline" className="rounded-full cursor-pointer">
              Try Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full min-h-[80vh] px-4 mx-auto">
        {/* Smart Dictionary (BIG) */}
        <Card className="col-span-1 row-span-2 hover:shadow-lg transition">
          <CardContent className="h-full p-6 flex flex-col items-center justify-center text-center space-y-3">
            <Search className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-semibold">Smart Dictionary</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Look up Tagalog words and see real example phrases and meanings.
            </p>
          </CardContent>
        </Card>

        {/* Phrase Hover (Small) */}
        <Card className="hover:shadow-md transition">
          <CardContent className="h-full p-6 flex flex-col items-center justify-center text-center space-y-3">
            <Layers3 className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Phrases with Context</h3>
            <p className="text-muted-foreground text-sm">
              Hover on words in phrases to learn how each part fits together.
            </p>
          </CardContent>
        </Card>

        {/* Lesson-Based Learning */}
        <Card className="hover:shadow-md transition">
          <CardContent className="h-full p-6 flex flex-col items-center justify-center text-center space-y-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Lesson-Based Learning</h3>
            <p className="text-muted-foreground text-sm">
              Structured lessons that build vocabulary and grammar naturally.
            </p>
          </CardContent>
        </Card>

        {/* Verb Conjugation */}
        <Card className="hover:shadow-md transition">
          <CardContent className="h-full p-6 flex flex-col items-center justify-center text-center space-y-3">
            <Repeat className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Verb Conjugation</h3>
            <p className="text-muted-foreground text-sm">
              Explore how verbs change in different tenses and contexts.
            </p>
          </CardContent>
        </Card>

        {/* AI Grammar Breakdown (BIG) */}
        <Card className="col-span-1 row-span-2 hover:shadow-lg transition">
          <CardContent className="h-full p-6 flex flex-col items-center justify-center text-center space-y-3">
            <Sparkles className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-semibold">AI Grammar Breakdown</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              WIP. Understand the logic and grammar behind Tagalog sentences
              with helpful AI breakdowns.
            </p>
          </CardContent>
        </Card>

        {/* Future Progress */}
        <Card className="hover:shadow-md transition">
          <CardContent className="h-full p-6 flex flex-col items-center justify-center text-center space-y-3">
            <BarChart2 className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Track Your Progress</h3>
            <p className="text-muted-foreground text-sm">
              WIP. Keep track of what you have mastered and where to improve.
            </p>
          </CardContent>
        </Card>

        {/* Flashcards */}
        <Card className="hover:shadow-md transition">
          <CardContent className="h-full p-6 flex flex-col items-center justify-center text-center space-y-3">
            <SquareStack className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Flashcards</h3>
            <p className="text-muted-foreground text-sm">
              WIP. Master words and phrases through engaging flashcard review.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Additional Information Section */}
      <section className="max-w-4xl min-h-[80vh] w-full mx-auto px-4 py-20 mt-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 tracking-tight">
          More than a language app
        </h2>

        <ul className="space-y-10 text-left">
          {ADDITIONAL_INFO.map(({ title, text }, idx) => (
            <li key={idx}>
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="text-muted-foreground text-sm">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <MaxWidthWrapper>
        <Card className="p-4">
          <CardContent className="space-y-8 p-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Start Your{' '}
              <span className="font-black bg-gradient-to-r from-ph-blue to-ph-red bg-clip-text text-transparent">
                Tagalog
              </span>{' '}
              Journey Today
            </h1>
            <p className="text-muted-foreground">
              Handa ka na ba? Maybe if you started yesterday, you would know
              what that means... Start today and impress your friends and
              family!
            </p>
            <Button size="lg" className="rounded-full cursor-pointer">
              Start Learning
            </Button>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </main>
  );
}
