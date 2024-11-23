"use server"
import { auth } from '@/auth.config'
import { prisma } from '@/prisma'
import { ChoreType, type Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const createChore = async (data: FormData) => {
    const session = await auth()

    /**
    
    {
        title: 'trying this full chore thing again',
        description: 'should have rooms, type, due date, and points',
        'rooms[0]': '2',
        'rooms[1]': '3',
        'type[label]': 'One-off',
        'type[value]': 'ONETIME', // use this one

        //@todo set up due date logic based on key (month: dateJS end of month)
        'due-date[name]': 'This month',
        'due-date[value]': 'month',// use this one
        points: '4'
    }
     */
    const rooms = Array.from(data.keys()).filter(key => key.includes('rooms[')).map(key => data.get(key))

    const chores = rooms.map(room => {
        // config it
        const chore = {
            createdByID: session!.user!.id!,
            title: data.get('title') as string,
            description: data.get('description') as string,
            points: parseInt(data.get('points') as string),
            roomID: parseInt(room as string),
            type: ChoreType[data.get('type[value]') as string],
        } satisfies Prisma.ChoreCreateManyInput
        return chore
    })

    //ship it
    await prisma.chore.createMany({ data: chores })
    revalidatePath('/chore-wars')
}

export default createChore