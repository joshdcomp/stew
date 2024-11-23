'use client'
import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const dueDates = [
    { name: 'No due date', value: null },
    { name: 'Today', value: 'today' },
    { name: 'This battle', value: 'battle' },
    { name: 'This month', value: 'month' },
    { name: 'This war', value: 'war' },
    // @todo set up custom date option
]


export default function DueDatePicker() {
    const [dated, setDated] = useState(dueDates[0])
    return (
        <Listbox
            as="div"
            value={dated}
            onChange={setDated}
            className="shrink-0"
            name="due-date"
        >
            <Label className="sr-only">Add a due date</Label>
            <div className="relative">
                <ListboxButton className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    <CalendarIcon
                        aria-hidden="true"
                        className={clsx(
                            'size-5 shrink-0 sm:-ml-1 text-gray-500',
                        )}
                    />
                    <span
                        className={clsx(
                            dated.value === null ? '' : 'text-gray-900',
                            'hidden truncate sm:ml-2 sm:block',
                        )}
                    >
                        {dated.value === null ? 'Due date' : dated.name}
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute right-0 z-10 mt-1 max-h-60 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {dueDates.map((dueDate) => (
                        <ListboxOption
                            key={dueDate.value}
                            value={dueDate}
                            className="relative cursor-default select-none bg-white px-3 py-2 data-[focus]:bg-gray-100"
                        >
                            <div className="flex items-center">
                                <span className="block truncate font-medium text-gray-500">{dueDate.name}</span>
                            </div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}