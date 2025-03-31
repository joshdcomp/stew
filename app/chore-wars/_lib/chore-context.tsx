'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getChores } from '@/app/lib/actions'

type ChoreContextValue = {
    chores: Array<any>,
    refreshChores: () => void
}

export const ChoreContext = createContext<ChoreContextValue | null>(null)

export function ChoreProvider({
    children,
}: {
        children: React.ReactNode,
}) {
    const [chores, setChores] = useState([])

    const fetchChores = async () => {
        console.log('chore context: getting chores')
        const chores = await getChores()
        console.log('chore context: chores', chores)
        if (!!chores) {
            setChores(chores)
        }
    }

    const refreshChores = () => {
        fetchChores()
    }

    useEffect(() => {
        fetchChores()
    }, [])
    return (
        <ChoreContext.Provider value={{ chores, refreshChores }}>{children}</ChoreContext.Provider>
    )
}

export function useChoreContext() {
    const context = useContext(ChoreContext)

    if (!context) {
        throw new Error('useChoreContext must be used within a ChoreProvider')
    }
    return context
}