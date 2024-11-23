'use client'
import { useChoreContext } from './chore-context'
import CreateChore from './create-chore-form'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { dayJs } from '../lib/dayjs'


export default function ChoreWarsContent() {
    const chores = useChoreContext()

    return (
        <>
            <h1 className='text-primary'>Chores</h1>
            <CreateChore />

            <ul role="list" className="divide-y divide-gray-100">
                {chores.map((chore) => (
                    <li key={chore.id} className="flex items-center justify-between gap-x-6 py-5">
                        <div className="min-w-0">
                            <div className="flex items-start gap-x-3">
                                <p className="text-sm/6 font-semibold text-gray-900">{chore.title}</p>
                            </div>
                            <p className="text-sm/6 text-gray-900">{chore.description}</p>
                            <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                                {
                                    chore.room
                                        ? (
                                            <>
                                                <p className="whitespace-nowrap">
                                                    Room: {chore?.room?.name}
                                                </p>
                                                <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                                                    <circle r={1} cx={1} cy={1} />
                                                </svg>
                                            </>
                                        )
                                        : null
                                }
                                {
                                    chore.dueOn
                                        ? (
                                            <>
                                                <p className="whitespace-nowrap">
                                                    Due on <time dateTime={chore.dueOn}>{`${chore.dueOn}`}</time>
                                                </p>
                                                <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                                                    <circle r={1} cx={1} cy={1} />
                                                </svg>
                                            </>
                                        )
                                        : null
                                }

                                <p className="truncate">Created by {chore?.createdBy?.name} on {dayJs(chore.createdOn).format(`MMM D 'YY`)}</p>
                            </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                            <a
                                href={chore.href}
                                className="hidden rounded-md cursor-pointer bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                            >
                                Did it!<span className="sr-only">({chore.title})</span>
                            </a>
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
                                        <a
                                            href="#"
                                            className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                        >
                                            Edit<span className="sr-only">, {chore.title}</span>
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                        >
                                            Delete<span className="sr-only">, {chore.title}</span>
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>

            <details>
                <summary>chore data</summary>
                <pre className="text-primary max-w-md overflow-scroll"><code>{JSON.stringify(chores || {}, null, 2)}</code></pre>
            </details>
        </>
    );
}

