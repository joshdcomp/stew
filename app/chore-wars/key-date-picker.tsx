'use client'
import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { KeyDateKeys, keyDateLabels, KeyDateTypes } from '@/app/lib/key-dates'

export default function KeyDatePicker({
    icon: Icon,
    name,
    title,
    label = 'Choose a date',
    placeholder = 'Date',
    allowEmpty = true,
    type = KeyDateTypes.ACTUAL
}) {

    const keyDatesFormOpts = [
        ...(allowEmpty ? [{ name: 'No due date', value: null }] : []),
        { name: keyDateLabels[KeyDateKeys.TODAY][type], value: KeyDateKeys.TODAY },
        { name: keyDateLabels[KeyDateKeys.BATTLE][type], value: KeyDateKeys.BATTLE },
        { name: keyDateLabels[KeyDateKeys.MONTH][type], value: KeyDateKeys.MONTH },
        { name: keyDateLabels[KeyDateKeys.WAR][type], value: KeyDateKeys.WAR },
        // @todo set up custom date option
    ]

    const [selected, setSelected] = useState(keyDatesFormOpts[0])
    return (
        <Listbox
            as="div"
            value={selected}
            onChange={setSelected}
            className="shrink-0"
            name={name}
            title={title}
        >
            <Label className="sr-only">{label}</Label>
            <div className="relative">
                <ListboxButton className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    <Icon
                        aria-hidden="true"
                        className={clsx(
                            'size-5 shrink-0 sm:-ml-1 text-gray-500',
                        )}
                    />
                    <span
                        className={clsx(
                            selected.value === null ? '' : 'text-gray-900',
                            'hidden truncate sm:ml-2 sm:block',
                        )}
                    >
                        {selected.value === null ? placeholder : selected.name}
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute right-0 z-10 mt-1 max-h-60 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {keyDatesFormOpts.map((keyDate) => (
                        <ListboxOption
                            key={keyDate.value}
                            value={keyDate}
                            className="relative cursor-default select-none bg-white px-3 py-2 data-[focus]:bg-gray-100"
                        >
                            <div className="flex items-center">
                                <span className="block truncate font-medium text-gray-500">{keyDate.name}</span>
                            </div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}