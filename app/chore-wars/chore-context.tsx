'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getChores } from '@/app/lib/actions'

export const ChoreContext = createContext<Array<any> | null>(null)

export function ChoreProvider({
    children,
}: {
        children: React.ReactNode,
}) {
    const [chores, setChores] = useState([])
    useEffect(() => {
        const fetchChores = async () => {
            console.log('chore context: getting chores')
            const chores = await getChores()
            console.log('chore context: chores', chores)
            if (!!chores) {
                setChores(chores)
            }
        }

        fetchChores()
    }, [])
    return (
        <ChoreContext.Provider value={chores}>{children}</ChoreContext.Provider>
    )
}

export function useChoreContext() {
    const context = useContext(ChoreContext)

    if (!context) {
        throw new Error('useChoreContext must be used within a ChoreProvider')
    }
    return context
}