'use server';
 
import { auth, signIn, signOut } from '@/auth.config';
import { prisma } from '@/prisma';
import { AuthError } from 'next-auth';

export async function authenticate(
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

export async function getUser() {
  try {
    console.log('[user] fetching current user')
    const { user } = await auth()
    return user
  }
  catch (err) {
    console.log('[user] error getting user', err)
    throw err
  }
}

export async function getRooms() {
  try {
    console.log('[rooms] fetching rooms')
    const rooms = await prisma.room.findMany()
    return rooms
  }
  catch (err) {
    console.log('[rooms] error getting rooms', err)
    throw err
  }
}

export async function getChores() {
  try {
    console.log('[chores] fetching chores')
    const chores = await prisma.chore.findMany({
      include: {
        room: true,
        createdBy: true,
      },
      orderBy: {
        createdOn: 'desc'
      }
    })

    return chores
  }
  catch (err) {
    console.log('[chores] error getting chores', err)
    throw err
  }
}