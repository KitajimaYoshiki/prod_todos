import AppBar from "@pages/api/AppBar";
import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { useState } from "react";
import LoadingButtons from "./api/LoadingButtons";

export default function Home() {

  return (
    <div>
      <AppBar></AppBar>
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          margin: 3,
          justifyContent: 'center',
          alignItems: 'center',
          gridTemplateRows: 'auto',
          mx: 'auto',
          width: 200
        }}
      >
        <LoadingButtons time={1000}/>
        <LoadingButtons time={500}/>
        <LoadingButtons />
      </Box>
    </div>
  )
}
