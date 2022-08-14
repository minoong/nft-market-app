import { Link as RouterLink, useLocation } from 'react-router-dom'
import { MENU_INFO_LIST } from '@constants/menu'
import AirlineStopsIcon from '@mui/icons-material/AirlineStops'
import { AppBar, Box, CssBaseline, IconButton, Link, Toolbar, Typography } from '@mui/material'

function NavBar() {
 const { pathname } = useLocation()

 return (
  <Box sx={{ flexGrow: 1 }}>
   <CssBaseline />
   <AppBar position="fixed">
    <Toolbar>
     <IconButton size="small" edge="start" color="inherit" aria-label="menu">
      <AirlineStopsIcon />
     </IconButton>
     <Typography
      variant="h6"
      component="a"
      noWrap
      href="/"
      sx={{
       mr: 10,
       fontFamily: 'monospace',
       fontWeight: 700,
       color: 'inherit',
       textDecoration: 'none',
      }}
     >
      LMW MARKET
     </Typography>
     <Box sx={{ display: 'flex', flexGrow: 1 }}>
      {MENU_INFO_LIST.map(({ menuName, path, icon }) => (
       <Link
        component={RouterLink}
        to={path}
        underline="none"
        key={path}
        sx={{
         color: pathname.startsWith(path) ? 'inherit' : 'rgba(165,175,202,.6)',
         fontWeight: 'bold',
         display: 'flex',
         transition: 'transform 0.15s ease-in-out',
         '&:not(:last-child)': {
          mr: 5,
         },
         '&:hover': {
          transform: 'scale3d(1.2, 1.2, 1)',
         },
        }}
       >
        {menuName}
        {icon && icon}
       </Link>
      ))}
     </Box>
    </Toolbar>
   </AppBar>
  </Box>
 )
}

export default NavBar
