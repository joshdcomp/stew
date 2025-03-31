"use server"
import { auth } from '@/auth.config'
import { prisma } from '@/prisma'
import { ChoreType, type Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { KeyDates } from '@/app/lib/key-dates'

async function getSemanticDate(semanticDateKey: string) {
    return await KeyDates[semanticDateKey as string]()
}

const createChore = async (data: FormData) => {
    const choreFactory = async (data: FormData) => {
        console.log(data)
        const session = await auth()
        // form input: repeat-cadence[value]
        // db fields:
        //   cadenceUnit
        //    cadenceValue
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
            type: ChoreType[data.get('type[value]') as string],
            dueOn,
        } satisfies Prisma.ChoreCreateManyInput

        return chore
    }

    const rooms = Array.from(data.keys()).filter(key => key.includes('rooms[')).map(key => data.get(key))
    // can I just…create many with a single array?
    if (rooms.length) {
        const chores = await Promise.all(rooms.map(async (room) => {
            const chore = {
                ...await choreFactory(data),
                roomID: parseInt(room as string),
            }
            return chore
        }))

        await prisma.chore.createMany({ data: chores })
    }
    else {
        const chore = await choreFactory(data)
        await prisma.chore.create({ data: chore })
    }

    revalidatePath('/chore-wars')
}

export default createChore