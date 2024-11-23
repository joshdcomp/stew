'use server';
 
import { auth, signIn, signOut } from '@/auth.config';
import { prisma } from '@/prisma';
import { AuthError } from 'next-auth';
import { dayJs } from './dayjs';
import { ChoreStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

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

export async function completeChore(chore) {
  try {
    const { user } = await auth()
    if (!user.id) {
      throw {
        error: true,
        type: 'auth',
        message: 'Something is wrong with your user session, sign out, sign back in, and try again',
        chore,
      }
    }

    const choreDBEntry = await prisma.chore.findFirst({
      where: {
        id: chore.id
      }
    })

    if (choreDBEntry.status !== ChoreStatus.AVAILABLE) {
      throw {
        error: true,
        type: 'dupe',
        message: 'Chore was already completed! Try refreshing the page and completing a different one',
        chore,
      }
    }

    // redundant check but it makes me feel better :)
    if (!!user.id && choreDBEntry.status === ChoreStatus.AVAILABLE) {
      const choreEntry = {
        completedByID: user.id,
        completedOn: dayJs().utc().format(),
        status: ChoreStatus.COMPLETED,
      }
      const updatedChore = await prisma.chore.update({
        where: {
          id: chore.id
        },
        data: choreEntry
      })
      console.log({ updatedChore })
      revalidatePath('/chore-wars')
      return { error: false, message: 'Chore updated successfully' }
    }
  }
  catch (err) {
    console.log('[chores] error completing chore \n', err)
    return err
  }
}

export async function deleteChore(chore) {
  try {
    const { user } = await auth()
    if (!user.id) {
      throw {
        error: true,
        type: 'auth',
        message: 'Something is wrong with your user session, sign out, sign back in, and try again',
        chore,
      }
    }
    // redundant check but it makes me feel better :)
    if (!!user.id) {
      const deletedChore = await prisma.chore.delete({
        where: {
          id: chore.id
        },
      })
      console.log({ deletedChore })
      revalidatePath('/chore-wars')
      return { error: false, message: 'Chore deleted successfully' }
    }
  }
  catch (err) {
    console.log('[chores] error deleting chore \n', err)
    return err
  }
}