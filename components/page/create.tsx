import { Box, Button, Grid, TextField } from '@mui/material'
import { createUser } from 'components/api/todoItemDao'
import { user } from 'components/dto/user'
import React, { useState } from 'react'

import LoginBar from '../parts/LoginBar'

const Create = (props: any) => {
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [idError, setIdError] = useState(false)
  const [idRequired, setIdRequired] = useState(true)
  const [passError, setPassError] = useState(false)
  const [passRequired, setPassRequired] = useState(true)
  const [confirmError, setConfirmError] = useState(false)
  const [confirmRequired, setConfirmRequired] = useState(true)
  const [buttonAble, setButtonAble] = useState(true)

  // 画面遷移
  const handle = (name: string) => {
    props.setMenu(name)
  }

  // all error status 'false'
  const changeFalse = () => {
    setIdError(false)
    setPassError(false)
    setConfirmError(false)
    return
  }

  // all error status 'true'
  const changeTrue = () => {
    setIdError(true)
    setPassError(true)
    setConfirmError(true)
    return
  }

  // 入力値チェック
  const checkValue = (): boolean => {
    // Nullチェック
    if (!id || !password || !confirm) {
      alert('ID、Passwordを入力してください。')
      if (!id) {
        setIdError(true)
      } else {
        setIdError(false)
      }
      if (!password) {
        setPassError(true)
      } else {
        setPassError(false)
      }
      if (!confirm) {
        setConfirmError(true)
      } else {
        setConfirmError(false)
      }
      return false
    }

    // 字種チェック
    const idType = id.match(/^[a-zA-Z0-9]*$/)
    const passType = password.match(/^[a-zA-Z0-9]*$/)
    const confirmType = confirm.match(/^[a-zA-Z0-9]*$/)
    if (!idType || !passType || !confirmType) {
      alert(
        '利用できない文字が含まれています。\n半角英数字のみを入力してください。'
      )
      if (!idType) {
        setIdError(true)
      } else {
        setIdError(false)
      }
      if (!passType) {
        setPassError(true)
      } else {
        setPassError(false)
      }
      if (!confirmType) {
        setConfirmError(true)
      } else {
        setConfirmError(false)
      }
      return false
    }

    changeFalse()
    return true
  }

  // アカウント作成
  const createUserHandle = async () => {
    // 入力値チェック
    const valueFlag = checkValue()
    if (!valueFlag) {
      return
    }

    // 作成
    const userInfo: user = {
      id: id,
      password: password,
    }
    const resultCode = await createUser(userInfo)
    // 作成チェック
    if (resultCode == 400) {
      alert('このIDはすでに利用されています。')
      changeTrue()
    } else if (resultCode == 201) {
      alert('登録成功')
      // 画面遷移
      handle('')
    } else {
      alert('データベースに接続できませんでした。')
      changeTrue()
    }

    return
  }

  // set Password
  const handleChangePassword = (inPassword: string) => {
    setPassword(inPassword)
    if (inPassword === confirm && confirm !== '') {
      setButtonAble(false)
    } else {
      setButtonAble(true)
    }
  }

  // set confirm
  const handleChangeConfirm = (inConfirm: string) => {
    setConfirm(inConfirm)
    if (inConfirm === password && password !== '') {
      setButtonAble(false)
    } else {
      setButtonAble(true)
    }
  }

  return (
    <div>
      <LoginBar text={'アカウント登録'} />
      <Box
        sx={{
          margin: 10,
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required={idRequired}
                error={idError}
                inputProps={{ maxLength: 25 }}
                id="outlined-required"
                label="ID"
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
            </div>
          </Box>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required={passRequired}
                error={passError}
                inputProps={{ maxLength: 16 }}
                id="outlined-password-input"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => handleChangePassword(event.target.value)}
              />
            </div>
          </Box>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required={confirmRequired}
                error={confirmError}
                inputProps={{ maxLength: 16 }}
                id="outlined-password-reinput"
                label="Password（確認）"
                type="password"
                value={confirm}
                onChange={(event) => handleChangeConfirm(event.target.value)}
              />
            </div>
          </Box>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
          <Box
            sx={{
              margin: 2,
              padding: 1,
            }}
          >
            <Button variant="contained" onClick={() => handle('')}>
              戻る
            </Button>
          </Box>
          <Box
            sx={{
              margin: 2,
              padding: 1,
            }}
          >
            <Button
              variant="contained"
              disabled={buttonAble}
              onClick={() => createUserHandle()}
            >
              登録
            </Button>
          </Box>
        </Grid>
      </Box>
    </div>
  )
}

export default Create
