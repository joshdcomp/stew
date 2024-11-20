"use server"
import { auth } from '@/auth.config'
import { prisma } from '@/prisma'
import { type Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export default async (data: FormData) => {
    const session = await auth()
    // config it
    const chore = {
        createdBy: { connect: { id: session!.user!.id! } },
        title: data.get('title') as string,
        description: data.get('description') as string,
        points: parseInt(data.get('points') as string),
    } satisfies Prisma.ChoreCreateInput
    //ship it
    await prisma.chore.create({ data: chore })
    revalidatePath('/chore-wars')
}
