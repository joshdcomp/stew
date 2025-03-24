'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link'
import { logOut } from '@/app/lib/actions'
import { useUserContext } from './user-context'

export default function UserMenu() {
    const user = useUserContext()

    if (!user || typeof user === 'string') {
        return (
            <Link href="/login" className="text-sm/6 font-semibold text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
            </Link>
        )
    }
    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                        alt=""
                        src={user.image}
                        className="size-8 rounded-full"
                    />
                </MenuButton>
            </div>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <MenuItem>
                    <Link
                        href=""
                        className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                        Your Profile
                    </Link>
                </MenuItem>
                <MenuItem>
                    <button
                        onClick={logOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                        Sign out
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}
