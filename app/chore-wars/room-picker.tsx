'use client'
import { getRooms } from '@/app/lib/actions'

import { Fragment, useEffect, useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export default function RoomPicker() {
    const [rooms, setRooms] = useState([])
    const [selectedRooms, setSelectedRooms] = useState([])

    useEffect(() => {
        //@TODO set up error handling for empty states
        const fetchRooms = async () => {
            const req = await getRooms()
            setRooms(req)
        }

        fetchRooms()
    }, [])

    const buttonLabelDefault = 'Room(s)'
    const buttonLabel = !selectedRooms.length
        ? buttonLabelDefault
        : rooms.filter((room) => (selectedRooms.includes(room.id))).map((room) => room.name).join(', ')

    return (
        <Listbox
            as="div"
            multiple
            value={selectedRooms}
            onChange={setSelectedRooms}
            className="shrink-0"
            name='rooms'
            title='Room(s)'
        >
            <Label className="sr-only">{buttonLabelDefault}</Label>
            <div className="relative">
                <ListboxButton
                    className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3"
                >

                    <HomeModernIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400 sm:-ml-1" />

                    <span className={'truncate sm:ml-2 sm:block'}>
                        {buttonLabel}
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {rooms ? rooms.map((room) => (
                        <ListboxOption
                            key={`${room.id}-${room.name}`}
                            value={room.id}
                            as={Fragment}
                        >
                            {({ focus, selected }) => {
                                const styles = {
                                    wrapper: clsx(
                                        'relative flex cursor-default select-none bg-white px-3 py-2 text-gray-500 cursor-pointer data-[focus]:bg-gray-100',
                                        { 'bg-gray-100': focus }
                                    ),
                                    label: 'ml-3 block truncate shrink-0 font-medium group-data-selected:font-semibold',
                                    checkIcon: clsx(
                                        'absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600',
                                    ),
                                }
                                return (
                                    <div
                                        className={styles.wrapper}
                                    >
                                        <span className={styles.label}>{room.name}</span>
                                        {selected ? (
                                            <span className={styles.checkIcon}>
                                                <CheckIcon aria-hidden="true" className="size-4" />
                                            </span>
                                        ) : null}
                                    </div>
                                )
                            }}
                        </ListboxOption>
                    )) : null}
                </ListboxOptions>
            </div>
        </Listbox >
    )
}