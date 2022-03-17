import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import StyleIcon from '@mui/icons-material/Style';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useTheme } from "@mui/material";
import React, { CSSProperties } from "react";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { User } from '../components/home/user';
import { userLogoutAsync } from '../reduxSlices/userSlice';

export const drawerWidth = 240;

export default function HomePage() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useAppSelector(state => state.user.currentUser);
  const dispatch = useAppDispatch();

  //*************************** */

  
  const centeredContent: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  };
  //*************************** */
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
      <div style={{ background: theme.palette.secondary.main, color: theme.palette.secondary.contrastText, height: "100%"}}>
        <Toolbar style={{ background: theme.palette.primary.main, minHeight: '48px' }}/>
        <List >
          <ListItem key={'user'} divider={true} sx={{ ...centeredContent, pt: 3, pb: 3 }}>
            <h1>Em PLM</h1>
          </ListItem>
          <ListItemButton sx={
            { 
              ":hover": { backgroundColor: theme.palette.secondary.dark} 
            }
          } key={'activestyles'} divider={true} component={Link} to={`/auth/activestyles`} onClick={handleDrawerToggle}>
            <ListItemIcon style={{ color: theme.palette.secondary.light }}>
             <FavoriteIcon/>
            </ListItemIcon>
            <ListItemText primary={'Active Styles'} />
          </ListItemButton>
          <ListItemButton sx={
            { 
              ":hover": { backgroundColor: theme.palette.secondary.dark} 
            }
          } key={'styles'} divider={true} component={Link} to={`/auth/styles`} onClick={handleDrawerToggle}>
            <ListItemIcon style={{ color: theme.palette.secondary.light }}>
              <StyleIcon/>
            </ListItemIcon>
            <ListItemText primary={'Styles'} />
          </ListItemButton>
          <ListItemButton sx={
            { 
              ":hover": { backgroundColor: theme.palette.secondary.dark} 
            }
          } key={'templates'} divider={true} component={Link} to={`/auth/templates`} onClick={handleDrawerToggle}>
            <ListItemIcon style={{ color: theme.palette.secondary.light }}>
              <StorageIcon/>
            </ListItemIcon>
            <ListItemText primary={'Templates'} />
          </ListItemButton>
          <ListItemButton sx={
            { 
              ":hover": { backgroundColor: theme.palette.secondary.dark} 
            }
          } key={'profile'} divider={true} component={Link} to={`/auth/profile`} onClick={handleDrawerToggle}>
            <ListItemIcon style={{ color: theme.palette.secondary.light }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItemButton>
          <ListItemButton sx={
            { 
              ":hover": { backgroundColor: theme.palette.secondary.dark} 
            }
          } key={'setup'} divider={true} component={Link} to={`/auth/setup`} onClick={handleDrawerToggle}>
            <ListItemIcon style={{ color: theme.palette.secondary.light }}>
              <SettingsAccessibilityIcon/>
            </ListItemIcon>
            <ListItemText primary={'Set Up'} />
          </ListItemButton>
        </List>
      </div>
  );

  
  let navigate = useNavigate();

  const handleLoggout = () => {
    dispatch(userLogoutAsync());
  };

    // NOTE: This should never be renderd du to auth requeries for Routing path. Right?
  if (!user) {
    return (
      <p>
      You are not logged in.
      <button
        onClick={() => navigate("/login")}
      >
        Go to login screen
      </button>
    </p>
    );
  }

  return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { md: `calc(100% - ${drawerWidth}px)` },
              ml: { md: `${drawerWidth}px` },
            }}
          >
            <Toolbar style={{ background: theme.palette.primary.main, minHeight: '48px' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }}></Box>
              <User/>
              <IconButton
                onClick={handleLoggout}
                size="large"
                edge="end"
                color="inherit"
                aria-label="logout"
                sx={{ ml: 2 }}
              >
                <ExitToAppIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="todo: some name"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                width: `${drawerWidth}px`,
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: '16px', pt: '64px', minHeight: '100vh', width: { md: `calc(100% - ${drawerWidth}px)`, background: theme.palette.secondary.main},
           }}
          >
            {/* Outlet: Renders the child route's element, if there is one. */}
            <Outlet/>
          </Box>
        </Box>
    );
  };