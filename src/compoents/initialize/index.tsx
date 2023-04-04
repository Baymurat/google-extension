import { Box, TextField, Button, FormHelperText, FormControl, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuthContext } from '../../context/authContext'

const InitializePage = () => {
  const [isError, setIsError] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const { setInitializedState } = useAuthContext()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setIsError(true)
    } else {
      setInitializedState(password)
        .then(() => {
          setIsError(false)
        })
        .catch(() => {
          setIsError(true)
        })
    }
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
      <Typography variant='h5'>Initialize App</Typography>
      <TextField
        onChange={({ target }) => setPassword(target.value)}
        value={password}
        fullWidth
        error={isError}
        label="Input password"
        type='password'
      />
      <TextField
        onChange={({ target }) => setConfirmPassword(target.value)}
        value={confirmPassword}
        fullWidth
        error={isError}
        label="Confirm password"
        type='password'
      />
      {isError && <FormControl error={isError} variant='outlined'>
        <FormHelperText id="component-error-text">Passwords do not match</FormHelperText>
      </FormControl>}
      <Button fullWidth type='submit' variant='contained' color='success'>
        Submit
      </Button>
    </Box>
  )
}

export default InitializePage