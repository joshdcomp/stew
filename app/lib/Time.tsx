import { dayJs } from '@/app/lib/dayjs'
export default function Time(dateString, format = `MMM D 'YY`) {
    return (
        <time
            dateTime={dateString}
            // @ts-expect-error Type error: This expression is not callable
            title={dayJs(dateString).format('LLLL')}
        >
            {/* @ts-expect-error Type error: This expression is not callable */}
            {dayJs(dateString).format(format)}
        </time>
    )
}
