import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import StorageIcon from '@mui/icons-material/Storage';
import StyleIcon from '@mui/icons-material/Style';
import { alpha, AppBar, Box, CssBaseline, Drawer, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar, Typography, useTheme } from "@mui/material";
import React, { CSSProperties } from "react";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppSelector } from '../app/hooks';
import { Loggoute } from '../components/appBar/loggoute';
import { User } from '../components/appBar/user';


export const drawerWidth = 240;

export default function HomePage() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useAppSelector(state => state.user.currentUser);

  //*************************** */

  
  const centeredContent: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  };

   const Search = styled('div') (()=> ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(() => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(() => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));

  //*************************** */
  
  // const onTypingSearch = useCallback(
  //   (input: string) =>
  //   dispatch(searchStyles(input)).then(
  //     () => {
  //       // deliver matching result
  //     },
  //     (error) => {
  //       // if search fail,  no match??
  //       const resMessage =
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString();
  //       console.log("Search of styles faild: " + resMessage);
  //     }
  //   ),
  //   [dispatch]
  // );


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
      <div style={{ background: theme.palette.secondary.main, color: theme.palette.secondary.contrastText, height: "100%"}}>
        <Toolbar style={{ background: theme.palette.primary.main, minHeight: '48px' }}/>
        <List >
          <ListItem key={'user'} divider={true} sx={{ ...centeredContent, pb: 5 }}>
            <Typography variant="h3" fontFamily={'Righteous'} >EmPLM</Typography>
          </ListItem>
          <ListItemButton sx={
            { 
              ":hover": { backgroundColor: theme.palette.secondary.dark} 
            }
          } key={'mystyles'} divider={true} component={Link} to={`/mystyles`} onClick={handleDrawerToggle}>
            <ListItemIcon style={{ color: theme.palette.secondary.light }}>
             <FavoriteIcon/>
            </ListItemIcon>
            <ListItemText primary={'My Styles'} />
          </ListItemButton>
          <ListItemButton sx={
            { 
              ":hover": { backgroundColor: theme.palette.secondary.dark} 
            }
          } key={'styles'} divider={true} component={Link} to={`/styles`} onClick={handleDrawerToggle}>
            <ListItemIcon style={{ color: theme.palette.secondary.light }}>
              <StyleIcon/>
            </ListItemIcon>
            <ListItemText primary={'Styles'} />
          </ListItemButton>
          <ListItemButton sx={
            { 
              ":hover": { backgroundColor: theme.palette.secondary.dark} 
            }
          } key={'templates'} divider={true} component={Link} to={`/templates`} onClick={handleDrawerToggle}>
            <ListItemIcon style={{ color: theme.palette.secondary.light }}>
              <StorageIcon/>
            </ListItemIcon>
            <ListItemText primary={'Templates'} />
          </ListItemButton>
          <ListItemButton sx={
            { 
              ":hover": { backgroundColor: theme.palette.secondary.dark} 
            }
          } key={'profile'} divider={true} component={Link} to={`/profile`} onClick={handleDrawerToggle}>
            <ListItemIcon style={{ color: theme.palette.secondary.light }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItemButton>
          <ListItemButton sx={
            { 
              ":hover": { backgroundColor: theme.palette.secondary.dark} 
            }
          } key={'setup'} divider={true} component={Link} to={`/setup`} onClick={handleDrawerToggle}>
            <ListItemIcon style={{ color: theme.palette.secondary.light }}>
              <SettingsAccessibilityIcon/>
            </ListItemIcon>
            <ListItemText primary={'Set Up'} />
          </ListItemButton>
        </List>
      </div>
  );

  
  let navigate = useNavigate();

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
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder={'Search..'}
                  inputProps={{ 'aria-label': 'Search' }}
                />
              </Search>
              <User/>
              <Loggoute/>
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
