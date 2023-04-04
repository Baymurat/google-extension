import { Box } from '@mui/material'
import InitializePage from './compoents/initialize';
import LoginPage from './compoents/login';
import { useAuthContext } from './context/authContext';

const App = () => {
  const { isAuthorized, isInitialized } = useAuthContext()

  let renderComponent = null

  if (!isInitialized) {
    renderComponent = (<InitializePage />)
  } else if (!isAuthorized) {
    renderComponent = (<LoginPage />)
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
