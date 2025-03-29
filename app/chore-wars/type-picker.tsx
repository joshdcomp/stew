'use client'
import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CalendarIcon, CheckIcon, SwatchIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { ChoreType } from '@prisma/client'
import KeyDatePicker from './key-date-picker'
import { KeyDateTypes } from '../lib/key-dates'

export default function TypePicker() {
    const types = [
        {
            label: 'One-off',
            value: ChoreType.ONETIME
        },
        {
            label: 'Repeatable',
            value: ChoreType.REPEATABLE
        },
    ]
    const [labelled, setLabelled] = useState(types[0])

    //@TODO set up repeatable logic (when repeatable is selected, add additional key date picker)
    return (
        <>
            <Listbox
                as="div"
                value={labelled}
                onChange={setLabelled}
                className="shrink-0"
                name="type"
                title='One-off or repeatable?'
            >
                <Label className="sr-only">Add a type</Label>
                <div className="relative">
                    <ListboxButton className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                        <SwatchIcon
                            aria-hidden="true"
                            className={clsx(
                                labelled.value === null ? 'text-gray-300' : 'text-gray-500',
                                'size-5 shrink-0 sm:-ml-1',
                            )}
                        />
                        <span
                            className={clsx(
                                'hidden truncate sm:ml-2 sm:block',
                            )}
                        >
                            {labelled.value === null ? 'Label' : labelled.label}
                        </span>
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                        {types.map((type) => (
                            <ListboxOption
                                key={type.value}
                                value={type}
                                className="relative select-none bg-white px-3 py-2 data-[focus]:bg-gray-100 cursor-pointer"
                            >
                                <div className="flex items-center text-gray-500">
                                    <span className="block truncate font-medium">{type.label}</span>
                                    <span className="absolute inset-y-0 left-0 hidden items-center pl-1.5 text-indigo-600 group-data-[selected]:flex">
                                        <CheckIcon className="size-5" aria-hidden="true" />
                                    </span>
                                </div>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
            {
                (labelled.value === ChoreType.REPEATABLE)
                    ? (
                        <KeyDatePicker
                            icon={CalendarIcon}
                            name='repeat-cadence'
                            title='Repeat on...'
                            label='Repeat on...'
                            placeholder='Repeat on'
                            allowEmpty={false}
                            type={KeyDateTypes.CADENCE}
                        />
                    )
                    : null

            }
        </>
    )
}