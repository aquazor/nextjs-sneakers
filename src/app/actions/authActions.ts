'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

export async function socialSignIn(providerId: string, callbackUrl: string | null) {
  try {
    await signIn(providerId, {
      redirectTo: callbackUrl ?? '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      throw { message: 'Something went wrong. Try again later' };
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/sign-in' });
}
