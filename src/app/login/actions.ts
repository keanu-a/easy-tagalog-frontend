'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { loginSchema, signUpSchema } from './schemas';

export async function signup(prevState: any, formData: FormData) {
  const validationResult = signUpSchema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      values: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      },
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        name: formData.get('name') as string,
      },
    },
  });

  if (error) {
    return {
      errorMessage: error.message,
      values: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      },
    };
  }

  return { message: 'We have sent a confirmation email to your inbox.' };
}

export async function login(prevState: any, formData: FormData) {
  const validationResult = loginSchema.safeParse({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      values: {
        email: formData.get('email') as string,
      },
    };
  }

  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      errorMessage: 'Invalid email or password',
      values: { email: data.email },
    };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
