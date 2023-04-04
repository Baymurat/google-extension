import { Box, TextField, Button, FormHelperText, FormControl, Typography } from '@mui/material'
import { useState } from 'react'

import { useAuthContext } from '../../context/authContext'

const LoginPage = () => {
  const [isError, setIsError] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const { setAuthorizedState, setInitializedState } = useAuthContext()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuthorizedState(password)
      .then(() => {
        setIsError(false)
      })
      .catch(() => {
        setIsError(true)
      })
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="1rem"
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant='h5'>
        Input your password for Login
      </Typography>
      <TextField
        onChange={({ target }) => setPassword(target.value)}
        value={password}
        fullWidth
        error={isError}
        label="Password"
        type='password'
      />
      {isError && <FormControl error={isError} variant='outlined'>
        <FormHelperText id="component-error-text">Incorrect Password</FormHelperText>
      </FormControl>}
      <Button fullWidth type='submit' variant='contained' color='success'>
        Login
      </Button>
      or
      <Button
        fullWidth
        variant='contained'
        color='warning'
        onClick={() => {
          setInitializedState(null)
        }}
      >
        Reset random string
      </Button>
    </Box>
  )
}

export default LoginPage