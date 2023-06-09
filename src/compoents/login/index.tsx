import { Box, TextField, Button, FormHelperText, FormControl, Typography, Divider } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { handleAuthenticate, handleFullReset } from '../../redux/features/auth/authSlice'

const LoginPage = () => {
  const [isError, setIsError] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

  const dispatcher = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatcher(handleAuthenticate({ password }))
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
      <Divider sx={{ width: '100%' }}>OR</Divider>
      <Button
        fullWidth
        variant='contained'
        color='warning'
        onClick={() => {
          dispatcher(handleFullReset())
        }}
      >
        Full reset
      </Button>
    </Box>
  )
}

export default LoginPage