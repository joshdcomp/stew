import {
    BellSnoozeIcon,
    CheckIcon,
} from '@heroicons/react/24/outline'
import { ChoreStatus } from '@prisma/client'
import clsx from 'clsx'


export default function ChoreBadge({ chore }) {
    const badges = {
        [ChoreStatus.AVAILABLE]: {
            bgColor: 'bg-fuchsia-600',
            content: chore.points
        },
        [ChoreStatus.COMPLETED]: {
            bgColor: 'bg-green-600',
            content: (<CheckIcon aria-hidden="true" className="size-5 text-white" />)
        },

        [ChoreStatus.EXPIRED]: {
            bgColor: 'bg-amber-600',
            content: (<BellSnoozeIcon aria-hidden="true" className="size-5 text-white" />)
        },
    }
    return (
        <span
            className={clsx(
                'flex size-8 items-center justify-center rounded-full ring-8 ring-transparent',
                badges[chore.status].bgColor
            )}
        >
            {badges[chore.status].content}
        </span>
    )
}