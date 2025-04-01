import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Search, Layers3 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-semibold sm:text-5xl">Easy Tagalog</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Learn Tagalog the modern way. Built for language learners who want
          structure, clarity, and real examples.
        </p>
        <Link href="/dictionary">
          <Button size="lg">Try the Dictionary</Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4">
        <Card className="text-center">
          <CardContent className="p-6 flex flex-col items-center space-y-3">
            <Search className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-semibold">Smart Dictionary</h3>
            <p className="text-muted-foreground text-sm">
              Look up Tagalog words and see real example phrases and meanings.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6 flex flex-col items-center space-y-3">
            <Layers3 className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-semibold">Phrases with Context</h3>
            <p className="text-muted-foreground text-sm">
              Hover on words in phrases to learn how each part fits together.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6 flex flex-col items-center space-y-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-semibold">Lesson-Based Learning</h3>
            <p className="text-muted-foreground text-sm">
              Structured lessons that build vocabulary and grammar naturally.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
