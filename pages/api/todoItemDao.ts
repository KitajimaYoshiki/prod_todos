import { ContactSupportOutlined } from '@mui/icons-material'
import { TodoItem } from '@pages/api/TodoItem'
// eslint-disable-next-line import/no-duplicates
import axios from 'axios'
// eslint-disable-next-line import/no-duplicates
import Axios, { AxiosInstance } from 'axios'

import { checkList } from './dto/checkList'
import { tags } from './dto/tags'
import { tasks } from './dto/tasks'

// APIのURL
const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002/'
).replace(/\/$/, '')
const API_TASKS = `${BACKEND_URL}/api/tasks`
// リクエストヘッダ
const apiClient: AxiosInstance = axios.create({
  // URL
  baseURL: API_TASKS,
  headers: {
    'Content-type': 'application/json',
  },
})

// タスク一覧取得
export const loadTodoList = async (
  user_id: string,
  show_completed: boolean
): Promise<tasks> => {
  // POST /api/tasks/all
  const task = await apiClient
    .post('/all', {
      user_id: user_id,
      show_completed: show_completed,
    })
    .then((resp) => resp.data)

  return task
}

// タグ取得
export const loadTags = async (task_id: number): Promise<tags> => {
  // POST /api/tasks/get_tags
  const tags = await apiClient
    .post('/get_tags', {
      task_id: task_id,
    })
    .then((resp) => resp.data)

  return tags
}

// チェックリスト取得
export const loadItems = async (
  task_id: number,
  show_completed: boolean
): Promise<checkList> => {
  // POST /api/tasks/get_tags
  const items = await apiClient
    .post('/get_check', {
      task_id: task_id,
      show_completed: show_completed,
    })
    .then((resp) => resp.data)

  return items
}

// Todoリストを更新するメソッドを返す
export const updateTodoItem = (items: TodoItem[], id: number): TodoItem[] => {
  const updated = [...items].map((item) => {
    if (item.id === id) {
      return { ...item }
    } else return item
  })
  return updated
  // ToDo: backendを要素を更新する.
  // PATCH /api/tasks/:id
}
