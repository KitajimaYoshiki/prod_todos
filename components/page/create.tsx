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

    // passwordとconfirmの文字列比較
    if (password !== confirm) {
      alert('Passwordと確認が一致しません。')
      changeTrue()
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
    } else if (resultCode == 500) {
      alert('データベースに接続できませんでした。')
      changeTrue()
    } else if (resultCode == 201) {
      // 画面遷移
      handle('')
    }

    return
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
                id="outlined-password-input"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
                id="outlined-password-reinput"
                label="Password（確認）"
                type="password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
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
            <Button variant="contained" onClick={() => createUserHandle()}>
              登録
            </Button>
          </Box>
        </Grid>
      </Box>
    </div>
  )
}

export default Create
