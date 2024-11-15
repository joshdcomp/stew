'use client'

import { createContext, useContext } from 'react'

export const ChoreContext = createContext<Promise<any> | null>(null)

export function ChoreProvider({
    children,
    chorePromise,
}: {
    children: React.ReactNode
    chorePromise: Promise<any>
}) {
    return (
        <ChoreContext.Provider value={chorePromise}>{children}</ChoreContext.Provider>
    )
}

export function useChoreContext() {
    const context = useContext(ChoreContext)
    if (!context) {
        throw new Error('useChoreContext must be used within a ChoreProvider')
    }
    return context
}