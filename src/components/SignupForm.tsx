import { useActionState, useEffect } from 'react';

import { signup } from '@/app/login/actions';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export default function SignupForm({
  setPending,
}: {
  setPending: (val: boolean) => void;
}) {
  const [state, action, pending] = useActionState(signup, undefined);

  useEffect(() => {
    setPending(pending);
  }, [pending, setPending]);

  return (
    <form className="space-y-4 *:space-y-1" action={action}>
      {state?.message && (
        <p className="text-ph-blue text-sm">{state?.message}</p>
      )}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Name"
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
          placeholder="Email"
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
          placeholder="Password"
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

      {state?.errorMessage && (
        <p className="text-ph-red text-sm">{state?.errorMessage}</p>
      )}

      <Button
        type="submit"
        className="rounded-full cursor-pointer w-full"
        disabled={pending}
      >
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
        Sign Up
      </Button>
    </form>
  );
}
