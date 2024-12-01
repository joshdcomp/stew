"use server"
import { auth } from '@/auth.config'
import { prisma } from '@/prisma'
import { ChoreType, type Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { KeyDates } from '@/app/lib/key-dates'

async function getSemanticDate(semanticDateKey: string) {
    const dateLiteral = await KeyDates[semanticDateKey as string]()
    console.log({ semanticDateKey, dateLiteral })
    return dateLiteral
}

const createChore = async (data: FormData) => {
    const session = await auth()
    const rooms = Array.from(data.keys()).filter(key => key.includes('rooms[')).map(key => data.get(key))

    const chores = await Promise.all(rooms.map(async (room) => {
        const dueOnKey = data.get('due-date[value]' as string)
        let dueOn = null
        if (!!dueOnKey) {
            dueOn = await getSemanticDate(dueOnKey as string)
        }
        // config it
        const chore = {
            createdByID: session!.user!.id!,
            title: data.get('title') as string,
            description: data.get('description') as string,
            points: parseInt(data.get('points') as string),
            roomID: parseInt(room as string),
            type: ChoreType[data.get('type[value]') as string],
            dueOn,
        } satisfies Prisma.ChoreCreateManyInput

        console.log({ dueOnKey, dueOn })

        return chore
    }))

    //ship it
    await prisma.chore.createMany({ data: chores })

    revalidatePath('/chore-wars')
}

export default createChore