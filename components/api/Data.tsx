import { checkList } from 'components/dto/checkList'
import { tag } from 'components/dto/tag'

export interface Data {
  title: string
  deadline: Date
  checklist: checkList[]
  memo: string
  start: Date
  tag: tag[]
}
