
import clsx from 'clsx'
import {
    ChartPieIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'


const navigation = [
    { name: 'Dashboard', href: '/chore-wars', icon: ChartPieIcon, current: true },
    {
        name: 'Admin',
        href: '/chore-wars/admin',
        icon: WrenchScrewdriverIcon,
        current: false,
        children: [
            { name: 'Rooms', href: '/chore-wars/admin/rooms', current: false },
            { name: 'Chores', href: '/chore-wars/admin/chores', current: false },
        ],
    },
]

export default function ChoreSubNav() {
    return (
        <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                {navigation.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className={clsx(
                                item.current
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm/6 font-semibold',
                            )}
                        >
                            <item.icon
                                aria-hidden="true"
                                className={clsx(
                                    item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                    'size-6 shrink-0',
                                )}
                            />
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}