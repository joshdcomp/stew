import { prisma } from '@/prisma'
import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'
import ChoreWarsContent from './content'
import { ChoreProvider } from './chore-context'

export default async function ChoreWars() {
    const session = await auth()

    if (!session) {
        redirect('/login')
    }

    // notably not awaiting here, this allows ChoreProvider to stream the promise to the content
    const chores = prisma.chore.findMany()

    return (
        <ChoreProvider chorePromise={chores}>
            <ChoreWarsContent session={session} />
        </ChoreProvider>
    )
}
