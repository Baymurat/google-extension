import { Box, Typography, Button, Divider } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { secretSelector, regenerateSecret } from '../../redux/features/secret/secretSlice'
import { handleLogout } from '../../redux/features/auth/authSlice'

const MainPage = () => {
  const secret = useSelector(secretSelector)
  const dispatcher = useDispatch()

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
      textAlign="center"
    >
      <Typography variant='h5'>
        {"Your random string is: "}
      </Typography>
      {secret}
      <Button
        fullWidth
        variant='contained'
        onClick={() => {
          dispatcher(regenerateSecret())
        }}
      >
        Regenrate random string
      </Button>
      <Divider sx={{ width: '100%' }}>OR</Divider>
      <Button
        fullWidth
        variant='contained'
        color="warning"
        onClick={() => {
          dispatcher(handleLogout())
        }}
      >
        Log out
      </Button>
    </Box>
  )
}

export default MainPage