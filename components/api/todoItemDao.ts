import axios, { AxiosInstance } from 'axios'
import { resultItems } from 'components/dto/resultItems'
import { resultTags } from 'components/dto/resultTags'
import { resultTasks } from 'components/dto/resultTasks'
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
): Promise<resultTasks> => {
  try {
    // POST /api/tasks/all
    const result = await apiClient
      .post('/all', {
        user_id: user_id,
        show_completed: show_completed,
      })
      .then((resp) => resp)
    const returnTask: resultTasks = {
      tasks: result.data,
      status: result.request.status,
    }
    return returnTask
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status) {
      const returnTask: resultTasks = {
        tasks: [],
        status: e.response.status,
      }
      return returnTask
    } else {
      const returnTask: resultTasks = {
        tasks: [],
        status: -1,
      }
      return returnTask
    }
  }
}

// タグ取得
export const loadTags = async (task_id: number): Promise<resultTags> => {
  try {
    // POST /api/tasks/get_tags
    const result = await apiClient
      .post('/get_tags', {
        task_id: task_id,
      })
      .then((resp) => resp)

    const returnTags: resultTags = {
      tags: result.data,
      status: result.request.status,
    }

    return returnTags
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status) {
      const returnTags: resultTags = {
        tags: [],
        status: e.response.status,
      }
      return returnTags
    } else {
      const returnTags: resultTags = {
        tags: [],
        status: -1,
      }
      return returnTags
    }
  }
}

// チェックリスト取得
export const loadItems = async (
  task_id: number,
  show_completed: boolean
): Promise<resultItems> => {
  try {
    // POST /api/tasks/get_tags
    const result = await apiClient
      .post('/get_check', {
        task_id: task_id,
        show_completed: show_completed,
      })
      .then((resp) => resp)

    const returnItems: resultItems = {
      items: result.data,
      status: result.request.status,
    }

    return returnItems
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status) {
      const returnItems: resultItems = {
        items: [],
        status: e.response.status,
      }
      return returnItems
    } else {
      const returnItems: resultItems = {
        items: [],
        status: -1,
      }
      return returnItems
    }
  }
}

// ログイン認証
export const login = async (user: user): Promise<number> => {
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
    } else {
      return -1
    }
  }
}

// アカウント作成
export const createUser = async (user: user): Promise<number> => {
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
    } else {
      return -1
    }
  }
}
