import { Box, Button, Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useRef, useState } from 'react'

import LoginBar from '../parts/LoginBar'

const Login = (props: any) => {
  const handle = (name: string) => {
    props.setMenu(name)
  }

  const inputRef = useRef(null)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  console.log(id)

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
                required
                id="outlined-required"
                label="ID"
                inputRef={inputRef}
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
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
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
            <Button variant="contained" onClick={() => handle('view')}>
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
