import { dayJs } from '@/app/lib/dayjs'

//@TODO switch to CadenceUnits from prisma client
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

export enum KeyDateTypes {
    CADENCE = 'cadence',
    ACTUAL = 'actual',
}
export const keyDateLabels = {
    [KeyDateKeys.TODAY]: {
        [KeyDateTypes.CADENCE]: 'Daily',
        [KeyDateTypes.ACTUAL]: 'Today',
    },
    [KeyDateKeys.BATTLE]: {
        [KeyDateTypes.CADENCE]: 'Every battle',
        [KeyDateTypes.ACTUAL]: 'This battle',
    },
    [KeyDateKeys.MONTH]: {
        [KeyDateTypes.CADENCE]: 'Monthly',
        [KeyDateTypes.ACTUAL]: 'This month',
    },
    [KeyDateKeys.WAR]: {
        [KeyDateTypes.CADENCE]: 'Every war',
        [KeyDateTypes.ACTUAL]: 'This war',
    },
}

export const KeyDates = {
    [KeyDateKeys.TODAY]: async () => {
        // @ts-expect-error Type error: This expression is not callable
        const due = dayJs.utc().endOf('today').format()
        return due
    },
    [KeyDateKeys.BATTLE]: async () => {
        const due = dayJs.utc().endOf('week').format() // need to get current battle end date
        return due
    },
    [KeyDateKeys.MONTH]: async () => {
        const due = dayJs.utc().endOf('month').format()
        return due
    },
    [KeyDateKeys.WAR]: async () => {
        const due = dayJs.utc().endOf('year').format()// need to get current war end date
        return due
    },
}
