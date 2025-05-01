'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeftFromLineIcon, GithubIcon, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState();

  const router = useRouter();

  const handleSignup = async (formData: FormData) => {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
    } else {
      router.push('/dashboard');
    }
  };

  const handleLogin = async (formData: FormData) => {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
    }

    router.push('/dashboard');
  };

  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center">
      <Link
        href="/"
        className={cn(
          'absolute top-4 left-4',
          buttonVariants({ variant: 'ghost' })
        )}
      >
        <ArrowLeftFromLineIcon />
        Back to Home
      </Link>

      <form>
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="name" autoCorrect="off" />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="name" autoCorrect="off" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoComplete="email"
            autoCorrect="off"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="password" type="password" />
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GithubIcon />
        )}{' '}
        GitHub
      </Button>
    </div>
  );
}
