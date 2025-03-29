import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);
dayjs.extend(utc)

export const dayJs = dayjs
export { Dayjs }