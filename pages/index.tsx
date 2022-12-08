import AppBar from "./parts/AppBar";
import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { useState } from "react";
import LoadingButtons from "./parts/LoadingButtons";
import { bgcolor, Container } from "@mui/system";
import SelectBox from "./parts/SelectBox";
import Tables from "./parts/Tables";

export default function Home() {

  return (
    <div>
      <AppBar></AppBar>
      <Container maxWidth='xl'>
      <Box 
        sx={{
          // bgcolor: 'red',
          height: '100vh'
        }}
      >
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 5fr)',
            margin: 0,
            justifyContent: 'center',
            alignItems: 'center',
            gridTemplateRows: 'auto',
            mx: 'auto',
            width: 500,
            // bgcolor: 'skyblue',
          }}
        >
          <LoadingButtons time={1000}/>
          <SelectBox></SelectBox>
        </Box>
        <Tables />
      </Box>
      </Container>
    </div>
  )
}
