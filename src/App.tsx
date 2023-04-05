import { Box } from '@mui/material'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InitializePage from './compoents/initialize';
import LoginPage from './compoents/login';
import MainPage from './compoents/main';
import { worker } from './workers/worker.src';
import { init } from './redux/features/secret/secretSlice';
import { workerEvent } from './redux/features/worker/workerSlice';
import { isAuthenticatedSelector, isInitializedSelector } from './redux/features/auth/authSlice';

worker.postMessage('init')

const App = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector)
  const isInitialized = useSelector(isInitializedSelector)

  const dispatcher = useDispatch()

  let renderComponent = null

  if (!isInitialized) {
    renderComponent = (<InitializePage />)
  } else if (!isAuthenticated) {
    renderComponent = (<LoginPage />)
  } else {
    renderComponent = (<MainPage />)
  }

  useEffect(() => {
    dispatcher(init())
    const onMessage = (e: MessageEvent<any>) => {
      dispatcher(workerEvent(e.data))
    }

    worker.addEventListener('message', onMessage)

    return () => {
      worker.removeEventListener('message', onMessage)
    }
  }, [dispatcher])

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {renderComponent}
    </Box>
  );
}

export default App;
