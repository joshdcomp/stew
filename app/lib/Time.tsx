import { dayJs } from '@/app/lib/dayjs'
export default function Time(dateString, format = `MMM D 'YY`) {
    const { dateString: date } = JSON.parse(JSON.stringify(dateString))
    console.log({ date, dateString, local: dayJs(date).format('LLLL') })
    return (
        <time
            dateTime={date}
            title={dayJs.utc(date).format('LLLL')}
        >
            {dayJs.utc(date).format(format)}
        </time>
    )
}
