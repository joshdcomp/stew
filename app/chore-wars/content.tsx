'use client'
import { useEffect, useState } from 'react'
import { useChoreContext } from './chore-context'
import CreateChore from './create-chore-form'
import { useUserContext } from '@/app/ui/user-context'

export default function ChoreWarsContent() {
    const chores = useChoreContext()

    const session = useUserContext()

    return (
        <>
            <h1 className='text-primary'>Chores</h1>
            <CreateChore />
            <pre className="text-primary max-w-md overflow-scroll"><code>{JSON.stringify(chores || {}, null, 2)}</code></pre>
            <details>
                <summary className='text-primary'>User info</summary>
                <pre className="text-primary max-w-md overflow-scroll"><code>{JSON.stringify(session || {}, null, 2)}</code></pre>
            </details>
        </>
    );
}
