import { checkList } from './dto/checkList'
import { tags } from './dto/tags'

export type TodoItem = {
  id: number
  title: string
  deadline: Date
  start: Date
  memo: string
  checklist: checkList
  tag: tags
  done: boolean
}
