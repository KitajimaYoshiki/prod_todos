import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { createItem, createTag, createTask } from 'components/api/todoItemDao'
import { checkList } from 'components/dto/checkList'
import { createItemDto } from 'components/dto/createItemDto'
import { createTagDto } from 'components/dto/createTagDto'
import { createTaskDto } from 'components/dto/createTaskDto'
import { resultCreateItemDto } from 'components/dto/resultCreateItemDto'
import { resultCreateTagDto } from 'components/dto/resultCreateTagDto'
import { resultCreateTaskDto } from 'components/dto/resultCreateTaskDto'
import { tag } from 'components/dto/tag'
import React, { useRef, useState } from 'react'

import CheckboxesTags from './CheckboxesTags'
import GutterlessList from './GutterlessList'

const CreateTaskDialog = (props: any) => {
  // Dialogを閉じる
  const handleClose = () => {
    props.setDialogOpen(false)
    // 初期化
    setInputStartDate(today)
    setInputDeadlineDate(today)
    setInputTitle('')
    setNewCheckList([])
    setInputMemo('')
  }

  // 作成
  const createTaskHandle = async () => {
    // Dateチェック
    const startDateCheck: Date = new Date(inputStartDate)
    const deadlineDateCheck: Date = new Date(inputDeadlineDate)

    const tags: tag[] = []
    const items: checkList[] = []

    if (startDateCheck > deadlineDateCheck) {
      alert(
        '期限日が開始日よりも前に設定されています。\n開始日よりも後の日付を設定してください。'
      )
      return
    }

    // createTask
    const requestTaskData: createTaskDto = {
      title: inputTitle,
      start: inputStartDate.replace('T', ' '),
      deadline: inputDeadlineDate.replace('T', ' '),
      memo: inputMemo,
      done: false,
    }
    const resultTask: resultCreateTaskDto = await createTask(
      props.userId,
      requestTaskData
    )

    //error
    if (
      resultTask.status === 500 ||
      resultTask.status === -1 ||
      !resultTask.task
    ) {
      // server error
      alert('データベースに接続できませんでした')
      return
    }

    // create Tag
    for (let indexTag = 0; indexTag < inputTags.length; indexTag++) {
      const requestTagData: createTagDto = {
        task_id: resultTask.task.id,
        name: inputTags[indexTag],
      }
      const resultTag: resultCreateTagDto = await createTag(requestTagData)
      //error
      if (
        resultTag.status === 500 ||
        resultTag.status === -1 ||
        resultTag.tag == undefined
      ) {
        // server error
        alert('データベースに接続できませんでした')
        return
      }
      tags.push(resultTag.tag)
    }

    // create Item
    for (let indexItem = 0; indexItem < viewCheckList.length; indexItem++) {
      const requestItemData: createItemDto = {
        task_id: resultTask.task.id,
        name: viewCheckList[indexItem],
      }
      const resultItem: resultCreateItemDto = await createItem(requestItemData)
      //error
      if (
        resultItem.status === 500 ||
        resultItem.status === -1 ||
        resultItem.item == undefined
      ) {
        // server error
        alert('データベースに接続できませんでした')
        return
      }
      items.push(resultItem.item)
    }

    // List更新
    props.todoList.push({ ...resultTask.task, tags, items })

    handleClose()
  }

  // タイトルチェック
  const titleCheck = (value: string) => {
    setInputTitle(value)
    if (value !== '') {
      setButtonAble(false)
    } else {
      setButtonAble(true)
    }
  }

  // 今日の日付取得
  const getFormattedDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = ('00' + (date.getMonth() + 1)).slice(-2)
    const day = ('00' + date.getDate()).slice(-2)
    const hours = ('00' + date.getHours()).slice(-2)
    const minute = '00'
    // const second = ('00' + date.getSeconds()).slice(-2)

    return `${year}-${month}-${day}T${hours}:${minute}`
  }
  const today: string = getFormattedDate(new Date())

  // 入力受け取り
  const [inputTitle, setInputTitle] = useState('')
  const [inputItemText, setInputItemText] = useState('')
  const [viewCheckList, setNewCheckList] = useState<string[]>([])
  const [inputStartDate, setInputStartDate] = useState(today)
  const [inputDeadlineDate, setInputDeadlineDate] = useState(today)
  const [inputMemo, setInputMemo] = useState('')
  const [inputTags, setInputTags] = useState<string[]>([])
  const [buttonAble, setButtonAble] = useState<boolean>(true)
  // 要素追加
  const onClickAddItem = () => {
    if (inputItemText === '') {
      return
    }

    viewCheckList.push(inputItemText)
    setInputItemText('')
  }

  const inputStartRef = useRef<HTMLInputElement>(null)
  function handleStartClick() {
    inputStartRef.current?.showPicker()
  }
  const inputDeadlineRef = useRef<HTMLInputElement>(null)
  function handleDeadlineClick() {
    inputDeadlineRef.current?.showPicker()
  }

  return (
    <div>
      <Dialog open={props.dialogOpen} onClose={handleClose}>
        <DialogTitle>タスク作成</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              required
              margin="dense"
              id="title"
              label="タイトル"
              fullWidth
              variant="standard"
              inputProps={{ maxLength: 30 }}
              value={inputTitle}
              onChange={(event) => titleCheck(event.target.value)}
            />
            {/* 開始日 */}
            <TextField
              id="start"
              label="開始日"
              variant="standard"
              type="datetime-local"
              inputProps={{ readOnly: true }}
              sx={{ mt: 2 }}
              value={inputStartDate}
            />
            <input
              type="datetime-local"
              style={{ display: 'none' }}
              ref={inputStartRef}
              value={inputStartDate}
              onChange={(event) => setInputStartDate(event.target.value)}
            />
            <IconButton
              id="start_button"
              sx={{ mt: 2, pr: 2 }}
              onClick={() => handleStartClick()}
            >
              <CalendarTodayIcon />
            </IconButton>
            {/* 期限日 */}
            <TextField
              required
              id="deadline"
              label="期限日"
              variant="standard"
              type="datetime-local"
              sx={{ marginTop: 2 }}
              inputProps={{ readOnly: true }}
              value={inputDeadlineDate}
            />
            <input
              type="datetime-local"
              style={{ display: 'none' }}
              ref={inputDeadlineRef}
              value={inputDeadlineDate}
              onChange={(event) => setInputDeadlineDate(event.target.value)}
            />
            <IconButton
              id="deadline_button"
              sx={{ mt: 2 }}
              onClick={() => handleDeadlineClick()}
            >
              <CalendarTodayIcon />
            </IconButton>
            {/*  */}
            <CheckboxesTags setInputTags={setInputTags} />
          </Box>
          <Box
            border={1}
            borderColor="grey.500"
            sx={{ mt: 2 }}
            borderRadius={2}
          >
            <Toolbar>
              <Typography sx={{ ml: 0 }}>チェックリスト</Typography>
            </Toolbar>
            <Paper sx={{ width: '97%', ml: 1, mb: 1 }}>
              <GutterlessList
                viewCheckList={viewCheckList}
                setNewCheckList={setNewCheckList}
              />
            </Paper>
            <Box sx={{ ml: 2, mr: 2, pb: 1 }}>
              <TextField
                sx={{ mr: 2, width: '80%' }}
                id="checklist_name"
                label="追加項目"
                variant="standard"
                value={inputItemText}
                onChange={(event) => setInputItemText(event.target.value)}
                autoComplete="off"
              />
              <Button
                variant="outlined"
                size="medium"
                sx={{ mt: 1 }}
                onClick={onClickAddItem}
              >
                追加
              </Button>
            </Box>
          </Box>
          <TextField
            margin="dense"
            id="memo"
            label="メモ"
            fullWidth
            variant="outlined"
            autoComplete="off"
            inputProps={{ maxLength: 300 }}
            sx={{ mt: 2 }}
            value={inputMemo}
            onChange={(event) => setInputMemo(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>戻る</Button>
          <Button disabled={buttonAble} onClick={createTaskHandle}>
            完了
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateTaskDialog
