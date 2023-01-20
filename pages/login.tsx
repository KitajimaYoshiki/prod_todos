import { Button } from '@mui/material'
import React from 'react'

const Login = (props: any) => {
  const handle = (name: string) => {
    props.setMenu(name)
  }

  return (
    <div>
      <Button variant="contained" onClick={() => handle('view')}>
        Login
      </Button>
    </div>
  )
}

export default Login
