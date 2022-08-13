import React, { useRef, useState } from 'react'
import { Link as RouterLink, Outlet } from 'react-router-dom'
import { MENU_INFO_LIST } from '@constants/menu'
import { AccountCircle } from '@mui/icons-material'
import AirlineStopsIcon from '@mui/icons-material/AirlineStops'
import { AppBar, Container, Link, Menu, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const DrawerHeader = styled('div')(({ theme }) => ({
 display: 'flex',
 alignItems: 'center',
 padding: theme.spacing(0, 1),
 ...theme.mixins.toolbar,
 justifyContent: 'flex-end',
}))

export default function PersistentDrawerLeft() {
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
 const ref = useRef<HTMLDivElement>(null)

 const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget)
 }

 const handleClose = () => {
  setAnchorEl(null)
 }

 return (
  <Box sx={{ display: 'flex', height: '100vh' }} ref={ref}>
   <CssBaseline />
   <AppBar position="fixed">
    <Toolbar>
     <IconButton color="inherit" aria-label="home" edge="start">
      <AirlineStopsIcon />
     </IconButton>

     <Typography variant="h6" noWrap component="div" sx={{ flexGrow: { xs: 1, md: 0 }, mr: { md: 5 } }}>
      LMW MARKET
     </Typography>

     <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
      {MENU_INFO_LIST.map(({ menuName, path, icon }) => (
       <Link
        component={RouterLink}
        to={path}
        underline="none"
        key={path}
        sx={{ my: 2, color: 'inherit', display: 'flex', paddingX: '0.765rem', alignItems: 'center' }}
       >
        {menuName}
        {icon && icon}
       </Link>
      ))}
     </Box>

     <Box sx={{ flexGrow: 0 }}>
      <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
       <AccountCircle />
      </IconButton>
      <Menu
       id="menu-appbar"
       anchorEl={anchorEl}
       anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
       }}
       keepMounted
       transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
       }}
       open={Boolean(anchorEl)}
       onClose={handleClose}
      >
       <MenuItem onClick={handleClose}>Profile</MenuItem>
       <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
     </Box>
    </Toolbar>
   </AppBar>
   <Container sx={{ minWidth: '1280px' }}>
    <DrawerHeader />
    <Outlet />
   </Container>
  </Box>
 )
}
