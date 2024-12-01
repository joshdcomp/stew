import { dayJs } from '@/app/lib/dayjs'


export enum KeyDateKeys {
    TODAY = 'today',
    BATTLE = 'battle',
    MONTH = 'month',
    WAR = 'war',
}

export type KeyDates = {
    [KeyDateKeys.TODAY]: () => string,
    [KeyDateKeys.BATTLE]: () => string,
    [KeyDateKeys.MONTH]: () => string,
    [KeyDateKeys.WAR]: () => string,
}

export const KeyDates = {
    [KeyDateKeys.TODAY]: async () => {
        // @ts-expect-error Type error: This expression is not callable
        const due = dayJs().utc().endOf('today').format()
        return due
    },
    [KeyDateKeys.BATTLE]: async () => {
        // @ts-expect-error Type error: This expression is not callable
        const due = dayJs().utc().endOf('week').format() // need to get current battle end date
        return due
    },
    [KeyDateKeys.MONTH]: async () => {
        // @ts-expect-error Type error: This expression is not callable
        const due = dayJs().utc().endOf('month').format()
        return due
    },
    [KeyDateKeys.WAR]: async () => {
        // @ts-expect-error Type error: This expression is not callable
        const due = dayJs().utc().endOf('year').format()// need to get current war end date
        return due
    },
}
