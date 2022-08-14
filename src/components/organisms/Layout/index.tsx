import { Outlet } from 'react-router-dom'
import NavBar from '@components/header/NavBar'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { styled } from '@mui/material/styles'

const DrawerHeader = styled('div')(({ theme }) => ({
 display: 'flex',
 alignItems: 'center',
 padding: theme.spacing(5, 1),
 ...theme.mixins.toolbar,
 justifyContent: 'flex-end',
}))

export default function PersistentDrawerLeft() {
 return (
  <Box sx={{ flexGrow: 1 }}>
   <CssBaseline />
   <NavBar />
   <Container sx={{ minWidth: '1280px', height: 'auto' }}>
    <DrawerHeader />
    <Outlet />
   </Container>
  </Box>
 )
}
