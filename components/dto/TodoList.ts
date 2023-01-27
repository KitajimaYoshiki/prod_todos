import { checkList } from './checkList'
import { tag } from './tag'
import { task } from './task'

export interface TodoList extends task {
  tags: tag[]
  items: checkList[]
}
