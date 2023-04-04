import { Box, Typography, Button, Divider } from '@mui/material'

import { useAuthContext } from "../../context/authContext"

const MainPage = () => {
  const { randomString, setAuthorizedState, regenerateRandomString } = useAuthContext()

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
      {randomString}
      <Button
        fullWidth
        variant='contained'
        onClick={regenerateRandomString}
      >
        Regenrate random string
      </Button>
      <Divider sx={{ width: '100%' }}>OR</Divider>
      <Button
        fullWidth
        variant='contained'
        color="warning"
        onClick={() => {
          setAuthorizedState(null)
        }}
      >
        Log out
      </Button>
    </Box>
  )
}

export default MainPage