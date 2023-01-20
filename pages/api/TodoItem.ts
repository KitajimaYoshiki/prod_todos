export type TodoItem = {
  id: number
  title: string
  deadline: Date
  start: Date
  memo: string
  checklist: Array<string>
  tag: Array<string>
  done: boolean
}
