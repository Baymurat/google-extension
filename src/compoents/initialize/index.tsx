import { Box, TextField, Button, FormHelperText, FormControl } from '@mui/material'
import { useState } from 'react'

const InitializePage = () => {
  const [isError, setIsError] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setIsError(true)
    } else {
      setIsError(false)
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