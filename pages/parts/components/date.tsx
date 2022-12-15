import { format, parseISO } from 'date-fns'
import ja from 'date-fns/locale/ja'

const DateFormat = (props: any) => {
  const date = parseISO(props.dateString)
  return (
    <time dateTime={props.dateString}>
      {format(date, 'yyyy年MM月dd日(E) HH時', { locale: ja })}
    </time>
  )
}

export default DateFormat
