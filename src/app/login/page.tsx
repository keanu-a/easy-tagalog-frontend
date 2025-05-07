'use client';

import { useActionState } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ArrowLeftFromLineIcon, Loader2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signup } from './actions';

export default function LoginPage() {
  const [state, action, pending] = useActionState(signup, undefined);

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

        <form className="space-y-4 *:space-y-1" action={action}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="name"
              autoCorrect="off"
              required
              defaultValue={state?.values?.name}
            />
          </div>
          {state?.errors?.name && (
            <p className="text-ph-red text-sm">{state.errors.name}</p>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
              autoCorrect="off"
              required
              defaultValue={state?.values?.email}
            />
          </div>
          {state?.errors?.email && (
            <p className="text-ph-red text-sm">{state.errors.email}</p>
          )}

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="password"
              type="password"
              required
              defaultValue={state?.values?.password}
            />
          </div>
          {state?.errors?.password && (
            <div className="text-ph-red text-sm">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((err, idx) => (
                  <li key={idx}>- {err}</li>
                ))}
              </ul>
            </div>
          )}

          {state?.message && <p>{state?.message}</p>}

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
              Or sign up with
            </span>
          </div>
        </div>

        <Button
          className="rounded-full cursor-pointer w-full"
          variant="outline"
          type="button"
          // disabled={isLoading}
        >
          {/* {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}{' '} */}
          Google
        </Button>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
