import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'

const exportable = dayjs.extend(utc)

export const dayJs = exportable
export { Dayjs }