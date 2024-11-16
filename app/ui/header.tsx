'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import clsx from 'clsx'
import UserMenu from './user-menu'
import { usePathname } from 'next/navigation'

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Chore Wars', href: '/chore-wars' },
]

// @todo take mobile menu out of document flow (pushes content down)
export default function Header() {

    return (
        <Disclosure as="nav" className="bg-white shadow">
            <div className="px-2 sm:px-3 lg:px-4 w-full">
                <div className="relative flex h-16 justify-between">

                    {/* mobile */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>

                    {/* main menu */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link href="/dashboard" className="-m-1.5 p-1.5">
                                <span className="sr-only">Chore Wars</span>
                                <img
                                    alt=""
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navigation.map((item) => {
                                const pathname = usePathname()
                                // will need to update logic as more routes are added
                                const isCurrent = item.href === pathname
                                const classes = clsx(
                                    'inline-flex items-center border-b-2 px-1 pt-1 text-sm',
                                    {
                                        'border-indigo-500 text-gray-900 font-medium': isCurrent,
                                        'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isCurrent,
                                    }
                                )
                                return (
                                    <Link key={item.name} href={item.href} className={classes}>
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* user menu */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <UserMenu />
                    </div>
                </div>
            </div>

            {/* mobile menu */}
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 pb-4 pt-2">
                    {navigation.map((item) => {
                        const isCurrent = item.href === '/dashboard'
                        const classes = clsx(
                            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                            {
                                'bg-indigo-50 border-indigo-500 text-indigo-700': isCurrent,
                                'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isCurrent,
                            }
                        )
                        return (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                className={classes}
                            >
                                {item.name}
                            </DisclosureButton>
                        )
                    })}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
