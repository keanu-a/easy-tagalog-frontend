'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeftFromLineIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import SignupForm from '@/components/auth/SignupForm';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [pending, setPending] = useState<boolean>(false);

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
        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h1>

        {mode === 'signup' ? (
          <SignupForm setPending={setPending} />
        ) : (
          <LoginForm setPending={setPending} />
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or {mode === 'login' ? 'login' : 'sign up'} with
            </span>
          </div>
        </div>

        <Button
          className="rounded-full cursor-pointer w-full"
          variant="outline"
          type="button"
          disabled={true}
        >
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
          Google
        </Button>

        {mode === 'login' ? (
          <div className="text-center text-sm">
            Are you a new user?{' '}
            <span
              onClick={() => setMode('signup')}
              className="text-ph-blue cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </div>
        ) : (
          <div className="text-center text-sm">
            Already have an account?{' '}
            <span
              onClick={() => setMode('login')}
              className="text-ph-blue cursor-pointer hover:underline"
            >
              Login
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
