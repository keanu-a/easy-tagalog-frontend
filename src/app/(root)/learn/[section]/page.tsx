import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import SectionLessonCard from '@/components/SectionLessonCard';
import BackQuitButton from '@/components/BackQuitButton';

const TEST_SECTION_LESSON_DATA = {
  sectionName: 'Beginner: Foundation',
  sectionLessons: [
    {
      lessonTitle: 'Alphabet (Abakada)',
      href: '/lesson/alphabet',
      progress: 100,
    },
    {
      lessonTitle: 'Simple Greetings',
      href: '/lesson/simple-greetings',
      progress: 75,
    },
    {
      lessonTitle: 'Personal Pronouns',
      href: '/lesson/personal-pronouns',
      progress: 25,
    },
    {
      lessonTitle: 'Simple Phrases',
      href: '/lesson/simple-phrases',
      progress: 0,
    },
  ],
};

export default function SectionPage() {
  return (
    <div className="mb-12">
      <MaxWidthWrapper>
        <BackQuitButton className="my-4" />

        <h2 className="font-righteous text-3xl text-center pb-12">
          {TEST_SECTION_LESSON_DATA.sectionName}
        </h2>

        <div className="flex flex-col gap-8 items-center">
          {TEST_SECTION_LESSON_DATA.sectionLessons.map(
            ({ lessonTitle, href, progress }, sectionLessonIndex) => (
              <SectionLessonCard
                lessonTitle={lessonTitle}
                progress={progress}
                href={href}
                key={sectionLessonIndex}
              />
            )
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
