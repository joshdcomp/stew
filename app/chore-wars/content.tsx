'use client'
// import { useChoreContext } from './chore-context'
import CreateChore from './create-chore-form'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { dayJs } from '../lib/dayjs'
import ChoreBadge from './chore-badge'
import { completeChore, deleteChore, getChores } from '../lib/actions'
import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import { ChoreStatus } from '@prisma/client'
import { useRouter } from 'next/navigation'


export default function ChoreWarsContent() {
    const router = useRouter()
    // const _chores = useChoreContext()
    const [chores, setChores] = useState([])


    console.log({ chores })
    const [choreErrors, setChoreErrors] = useState([])

    useEffect(() => {
        const doGetChores = async () => {
            const _chores = await getChores()
            setChores(_chores)
        }
        doGetChores()
    }, [setChores, choreErrors, setChoreErrors])

    const handleCompleteChore = useCallback((chore) => {
        const doCompleteChore = async () => {
            const req = await completeChore(chore)
            if (req.error) {
                const newErrs = [...choreErrors]
                newErrs.push({ ...chore, message: req.message })
                setChoreErrors(newErrs)
            }
            else {
                const newChores = await getChores()
                setChores(newChores)
                // not even sure this works
                router.refresh()
            }
        }
        doCompleteChore()
    }, [choreErrors, setChoreErrors, router])

    const handleDeleteChore = useCallback((chore) => {
        const doDeleteChore = async () => {
            const req = await deleteChore(chore)
            if (req.error) {
                const newErrs = [...choreErrors]
                newErrs.push({ ...chore, message: req.message })
                setChoreErrors(newErrs)
            }
            else {
                const newChores = await getChores()
                // I wanna know if this works...
                setChores(newChores)
                // not even sure this works
                router.refresh()
            }
        }
        doDeleteChore()
    }, [choreErrors, setChoreErrors, router])

    return (
        <>
            <h1 className='text-primary text-base/7 font-semibold'>Chores</h1>

            <CreateChore />

            <ul role="list" className="divide-y divide-gray-100">
                {chores.map((chore) => {
                    const styles = {
                        error: {
                            wrapper: 'bg-yellow-300'
                        },
                        normal: {
                            wrapper: ''
                        }
                    }
                    let styleKey = 'normal'

                    const errMatch = choreErrors.filter(i => i.id === chore.id)

                    if (errMatch.length) {
                        styleKey = 'error'
                        console.log(errMatch)
                    }

                    return (
                        <li key={chore.id} className={clsx(
                            "flex items-center justify-between gap-x-6 py-5 px-2",
                            styles[styleKey].wrapper
                        )}>
                            <div className='flex-shrink'>
                                <ChoreBadge chore={chore} />
                            </div>
                            <div className="min-w-0 grow">
                                {
                                    errMatch.length
                                        ? (
                                            <div className="flex items-start gap-x-3">
                                                <p className="text-sm/6 text-primary">
                                                    <span className='font-semibold'>Oop&hellip;</span> {errMatch[0]?.message}
                                                </p>
                                            </div>
                                        )
                                        : (
                                            <>
                                                <div className="flex items-start gap-x-3">
                                                    <p className="text-sm/6 font-semibold text-primary">
                                                        {chore.title}
                                                    </p>
                                                    {
                                                        chore.room
                                                            ? (
                                                                <p className="whitespace-nowrap text-sm/6 text-primary">
                                                                    Room: {chore?.room?.name}
                                                                </p>
                                                            )
                                                            : null
                                                    }
                                                </div>
                                                <p className="text-sm/6 text-gray-900">{chore.description}</p>
                                                <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                                                    {
                                                        chore.dueOn
                                                            ? (
                                                                <>
                                                                    <p className="whitespace-nowrap">
                                                                        {/* @ts-expect-error Type error: This expression is not callable */}
                                                                        Due on <time dateTime={chore.dueOn}>{dayJs(chore.dueOn).format(`MMM D 'YY`)}</time>
                                                                    </p>
                                                                    <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                                                                        <circle r={1} cx={1} cy={1} />
                                                                    </svg>
                                                                </>
                                                            )
                                                            : null
                                                    }

                                                    <p className="truncate">
                                                        {/* @ts-expect-error Type error: This expression is not callable */}
                                                        Created by {chore?.createdBy?.name} on <time dateTime={chore.createdOn} title={chore.createdOn}>{dayJs(chore.createdOn).format(`MMM D 'YY`)}</time>
                                                    </p>
                                                </div>
                                            </>
                                        )
                                }
                            </div>
                            <div className="flex flex-none items-center gap-x-4">
                                {
                                    chore.status === ChoreStatus.AVAILABLE
                                        ? (
                                            <button
                                                onClick={handleCompleteChore.bind(null, chore)}
                                                className="rounded-md cursor-pointer bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Did it!<span className="sr-only">({chore.title})</span>
                                            </button>
                                        )
                                        : null
                                }
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">Open options</span>
                                        <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <MenuItem>
                                            <button
                                                disabled
                                                className="block w-full text-left px-3 py-1 text-sm/6 text-gray-400 cursor-not-allowed data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                            >
                                                Edit<span className="sr-only">, {chore.title}</span>
                                            </button>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                onClick={handleDeleteChore.bind(null, chore)}
                                                className="block w-full text-left px-3 py-1 text-sm/6 text-primary cursor-pointer data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                            >
                                                Delete<span className="sr-only">, {chore.title}</span>
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </li>
                    )
                })}
            </ul>

            <details>
                <summary>chore data</summary>
                <pre className="text-primary max-w-md overflow-scroll"><code>{JSON.stringify(chores || {}, null, 2)}</code></pre>
            </details>
        </>
    );
}
