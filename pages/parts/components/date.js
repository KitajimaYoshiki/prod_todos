import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'

export default function DateFormat({ dateString }) {
 const date = parseISO(dateString)
 return <time dateTime={dateString}>{format(date, 'yyyy年MM月dd日(E) HH時', {locale:ja})}</time>
}