import { Box, Typography, Button } from '@mui/material'

import { useAuthContext } from "../../context/authContext"

const MainPage = () => {
  const { randomString, setAuthorizedState } = useAuthContext()

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
        onClick={() => {
          setAuthorizedState(null)
        }}
        variant='contained'
      >
        Log out
      </Button>
    </Box>
  )
}

export default MainPage