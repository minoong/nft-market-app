import { StyledEngineProvider } from '@mui/material'

import ThemeRoutes from './routes'

import '@assets/css/styles.css'

function App() {
 return (
  <StyledEngineProvider injectFirst>
   <ThemeRoutes />
  </StyledEngineProvider>
 )
}

export default App
