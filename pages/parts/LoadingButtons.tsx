import LoadingButton from '@mui/lab/LoadingButton'
import * as React from 'react'
import { useState } from 'react'

const LoadingButtons = (props: any) => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = React.useState(false)

  const handleClick = async () => {
    setLoading(true)
    setCount(count + 1)
    await new Promise((resolve) => setTimeout(resolve, props.time))
    setLoading(false)
  }

  return (
    <LoadingButton
      size="large"
      onClick={handleClick}
      loading={loading}
      loadingPosition="center"
      variant="contained"
      sx={{ margin: 3 }}
    >
      ♥ {count}
    </LoadingButton>
  )
}

export default LoadingButtons
