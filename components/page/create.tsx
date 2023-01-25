import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'

import LoginBar from '../parts/LoginBar'

const Create = (props: any) => {
  const handle = (name: string) => {
    props.setMenu(name)
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
              <TextField required id="outlined-required" label="ID" />
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
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
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
                required
                id="outlined-password-input"
                label="Password（確認）"
                type="password"
                autoComplete="current-password"
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
            <Button variant="contained" onClick={() => handle('')}>
              登録
            </Button>
          </Box>
        </Grid>
      </Box>
    </div>
  )
}

export default Create
