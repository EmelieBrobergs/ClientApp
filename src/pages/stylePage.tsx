import { useState } from "react";
import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, Outlet, useParams } from "react-router-dom";
import { User } from "../components/home/user";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userLogoutAsync } from "../reduxSlices/userSlice";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const StylePage = () => {
    const { styleId } = useParams<"styleId">();
    const [currentStyleId, setCurrentStyleId] = useState(styleId);

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = useAppSelector(state => state.user.currentUser);
    const dispatch = useAppDispatch();

    const handleDropdownToggle = () => {
        // TODO: Ända så state kollar om meny är öppen / stängd.
        setMobileOpen(!mobileOpen);
    };

    const handleLoggout = () => {
        dispatch(userLogoutAsync());
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
            >
                <Toolbar style={{ background: theme.palette.primary.main, minHeight: '48px' }}>
                    <Button
                        color="inherit"
                        endIcon={<KeyboardArrowDownIcon/>}
                        aria-label="open style drop down menu"
                        onClick={handleDropdownToggle}
                        sx={{ mr: 2, fontFamily: 'Righteous' }}
                    >
                        EmPLM
                    </Button>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <User />
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
            component="main"
            sx={{ flexGrow: 1, p: '16px', pt: '64px', minHeight: '100vh', minWidth:`100vw`, background: theme.palette.secondary.main,
           }}
          >
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={`${styleId}/info`}>info</Link>
                        </li>
                        <li>
                            <Link to={`${styleId}/mmntlist`}>mmntList</Link>
                        </li>
                        <li>
                            <Link to={`${styleId}/fitting`}>Fitting comments</Link>
                        </li>
                        <li>
                            <Link to={`${styleId}/handlesample`}>Handle Sample</Link>
                        </li>
                        <li>
                            {/* TODO: Bug, when getting to this page the style id becomes undefined on the other routes. Soulution, open a go back button in display page ? */}
                            <Link to={`${styleId}/nothinghere`}>Nothing Here</Link>
                        </li>
                    </ul>
                </nav>
                <hr />
               
            </div>
            {/* Outlet: Renders the child route's element, if there is one. */}
            <Outlet/>
          </Box>
        </Box>
    );
};

export default StylePage;

