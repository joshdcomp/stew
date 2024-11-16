'use server';
 
import { auth, signIn, signOut } from '@/auth.config';
import { AuthError, type User } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  }
  catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut({ redirectTo: '/login' })
  }
  catch (error) {
    console.log('[logout] error', error)
    throw error
  }
}
