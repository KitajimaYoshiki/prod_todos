import { format, parse, parseISO } from 'date-fns'
import ja from 'date-fns/locale/ja'

const DateFormat = (props: any) => {
  if (!props.dateString) {
    return null
  }
  const date = parseISO(props.dateString)
  //const date = parse(props.dateString, 'yoModo(E) Ho', new Date())
  return (
    <time dateTime={props.dateString}>
      {format(date, 'yoModo(E) Ho', { locale: ja })}
    </time>
  )
}

export default DateFormat
