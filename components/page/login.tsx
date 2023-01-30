import { Box, Button, Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import { login } from 'components/api/todoItemDao'
import { user } from 'components/dto/user'
import React, { useRef, useState } from 'react'

import LoginBar from '../parts/LoginBar'

const Login = (props: any) => {
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [idError, setIdError] = useState(false)
  const [idRequired, setIdRequired] = useState(true)
  const [passError, setPassError] = useState(false)
  const [passRequired, setPassRequired] = useState(true)

  // 画面遷移
  const handle = (name: string) => {
    props.setMenu(name)
  }

  // all error status 'false'
  const changeFalse = () => {
    setIdError(false)
    setPassError(false)
    return
  }

  // all error status 'true'
  const changeTrue = () => {
    setIdError(true)
    setPassError(true)
    return
  }

  // 入力値チェック
  const checkValue = (): boolean => {
    if (!id || !password) {
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
      return false
    }

    changeFalse()
    return true
  }

  // ログイン認証
  const authentication = async () => {
    // 入力値チェック
    const valueFlag: boolean = checkValue()
    if (!valueFlag) {
      return
    }

    // 認証
    const userInfo: user = {
      id: id,
      password: password,
    }
    const resultCode = await login(userInfo)
    // 認証チェック
    if (resultCode == 401 || resultCode == 400) {
      alert('IdまたはPassが正しくありません')
      changeTrue()
    } else if (resultCode == 200) {
      // 画面遷移
      handle('view')
      props.setUserId(id)
    }

    return
  }

  return (
    <div>
      <LoginBar text={'ログイン'} />
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
                inputProps={{ maxLength: 25 }}
                error={idError}
                id="outlined-required"
                label="ID"
                onChange={(event) => setId(event.target.value)}
                value={id}
              />
            </div>
          </Box>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center">
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
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </Box>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center">
          <Box
            sx={{
              margin: 2,
              padding: 1,
            }}
          >
            <Button variant="contained" onClick={() => authentication()}>
              ログイン
            </Button>
          </Box>
          <Box
            sx={{
              margin: 2,
              padding: 1,
            }}
          >
            <Button variant="contained" onClick={() => handle('create')}>
              新規作成
            </Button>
          </Box>
        </Grid>
      </Box>
    </div>
  )
}

export default Login
