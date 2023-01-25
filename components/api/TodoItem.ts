import { checkList } from '../dto/checkList'
import { tag } from '../dto/tag'

export type TodoItem = {
  id: number
  title: string
  deadline: Date
  start: Date
  memo: string
  checklist: checkList[]
  tag: tag[]
  done: boolean
}
