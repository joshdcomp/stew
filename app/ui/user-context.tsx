'use client'

import { User } from 'next-auth'
import { createContext, useContext } from 'react'

export const UserContext = createContext<User | null>(null)

export function UserProvider({
    children,
    user,
}: {
    children: React.ReactNode
    user: User
}) {
    return (
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
}