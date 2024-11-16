'use client'
import { use } from 'react';
import { useChoreContext } from './chore-context';
import createChore from './create-chore';
import { useRouter } from 'next/navigation';


export default function ChoreWarsContent({ session = {} }) {
    const chorePromise = useChoreContext()
    const chores = use(chorePromise)
    const router = useRouter()

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
                <h1>Chores</h1>
                <pre><code>{JSON.stringify(chores || {}, null, 2)}</code></pre>
                <details>
                    <summary>User info</summary>
                    <pre><code>{JSON.stringify(session || {}, null, 2)}</code></pre>
                </details>
                <form
                    action={async (e) => {
                        await createChore(e)
                        // so annoying
                        router.refresh()
                    }}
                >
                    <label>
                        <span className="block">Title</span>
                        <input type='text' required name='title' className='block min-w-full max-w-full text-slate-900' />
                    </label>

                    <label>
                        <span className="block">Description</span>
                        <textarea name='description' required className='block min-w-full max-w-full text-slate-900'></textarea>
                    </label>

                    <label>
                        <span className="block">Points</span>
                        <input name='points' type='number' required min={1} max={100} className='block min-w-full max-w-full text-slate-900' />
                    </label>

                    <button type="submit" className='block mt-4'>Create chore</button>
                </form>
            </main>
        </div>
    );
}
