import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import * as React from 'react'

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined">
        a
      </TextField>
    </Box>
  )
}
