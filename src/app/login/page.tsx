'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeftFromLineIcon, GithubIcon, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Email already exists');
    } else {
      router.push('/dashboard');
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Incorrect email or password');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center">
      <Link
        href="/"
        className={cn(
          'absolute top-4 left-0 sm:left-4',
          buttonVariants({ variant: 'ghost' })
        )}
      >
        <ArrowLeftFromLineIcon />
        Back to Home
      </Link>

      <div className="min-w-80 space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>

        <form className="space-y-4 *:space-y-1" onSubmit={() => {}}>
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="name"
              autoCorrect="off"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="name"
              autoCorrect="off"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="rounded-full cursor-pointer w-full">
            Sign Up
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or sign in with
            </span>
          </div>
        </div>
        <Button
          className="rounded-full cursor-pointer w-full"
          variant="outline"
          type="button"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}{' '}
          Google
        </Button>
        <Button
          className="rounded-full cursor-pointer w-full"
          variant="outline"
          type="button"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}{' '}
          Apple
        </Button>
      </div>
    </div>
  );
}
