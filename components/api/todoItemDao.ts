import axios, { AxiosInstance } from 'axios'
import { user } from 'components/dto/user'

// APIのURL
const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/'
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
) => {
  try {
    // POST /api/tasks/all
    const task = await apiClient
      .post('/all', {
        user_id: user_id,
        show_completed: show_completed,
      })
      .then((resp) => resp.data)
    return task
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status) {
      return e.response.status
    } else {
      return -1
    }
  }
}

// タグ取得
export const loadTags = async (task_id: number) => {
  try {
    // POST /api/tasks/get_tags
    const tags = await apiClient
      .post('/get_tags', {
        task_id: task_id,
      })
      .then((resp) => resp.data)

    return tags
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status) {
      return e.response.status
    } else {
      return -1
    }
  }
}

// チェックリスト取得
export const loadItems = async (task_id: number, show_completed: boolean) => {
  try {
    // POST /api/tasks/get_tags
    const items = await apiClient
      .post('/get_check', {
        task_id: task_id,
        show_completed: show_completed,
      })
      .then((resp) => resp.data)

    return items
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status) {
      return e.response.status
    } else {
      return -1
    }
  }
}

// ログイン認証
export const login = async (user: user) => {
  try {
    const result = await apiClient
      .post('/login', {
        user: user,
      })
      .then((resp) => resp.status)

    return result
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return e.response.status
    }
  }
}

// アカウント作成
export const createUser = async (user: user) => {
  try {
    const result = await apiClient
      .post('/create_user', {
        user: user,
      })
      .then((resp) => resp.status)

    return result
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return e.response.status
    }
  }
}
