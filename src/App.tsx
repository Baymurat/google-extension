import { Box } from '@mui/material'
import InitializePage from './compoents/initialize';
import LoginPage from './compoents/login';
import MainPage from './compoents/main';
import { useAuthContext } from './context/authContext';

const App = () => {
  const { isAuthorized, isInitialized } = useAuthContext()

  let renderComponent = null

  if (!isInitialized) {
    renderComponent = (<InitializePage />)
  } else if (!isAuthorized) {
    renderComponent = (<LoginPage />)
  } else {
    renderComponent = (<MainPage />)
  }

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
