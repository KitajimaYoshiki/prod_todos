import { PropaneSharp } from '@mui/icons-material'
import { Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'

export default function DenseAppBar(props: any) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Grid container alignItems="center" justifyContent="center">
            <Typography variant="h6" color="inherit" component="div">
              {props.text}
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
