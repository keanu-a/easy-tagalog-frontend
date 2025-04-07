import { LogOut, Pause, RotateCcw } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import {
  DialogContent,
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Switch } from './ui/switch';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLessonProgress } from '@/context/LessonProgressContext';

export default function LessonPause() {
  const router = useRouter();
  const { progress } = useLessonProgress();

  // Sets question index back to start (0)
  const handleRestartLesson = () => {
    const confirmRestart = window.confirm('Are you sure you want to restart?');
    if (confirmRestart) {
      window.location.reload();
    }
  };

  const handleQuitLesson = () => {
    const confirmQuit = window.confirm(
      'Are you sure you want to quit the lesson?'
    );
    if (confirmQuit) {
      // Back to home page
      router.push('/');
    }
  };

  return (
    <div className={progress === 100 ? 'hidden' : ''}>
      <Dialog>
        <DialogTrigger
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'rounded-full cursor-pointer'
          )}
        >
          <Pause />
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-8">
          <DialogHeader>
            <DialogTitle>Lesson Paused</DialogTitle>
            <DialogDescription className="flex gap-2 text-left">
              WARNING: <span>Progress will not be saved if you quit.</span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2 text-muted-foreground">
            <Switch className="hover:cursor-pointer data-[state=checked]:bg-enable-correct" />
            <span className="text-sm">Enable Audio</span>
          </div>

          <div className="flex space-x-2">
            <Button
              className="rounded-full cursor-pointer"
              onClick={handleRestartLesson}
            >
              <RotateCcw />
              Restart
            </Button>
            <Button
              className="rounded-full cursor-pointer"
              variant="destructive"
              onClick={handleQuitLesson}
            >
              <LogOut />
              Quit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
