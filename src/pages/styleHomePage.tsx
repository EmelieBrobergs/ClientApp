
import { AppBar, Box, CssBaseline, Toolbar, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import AppBarDropDownMenu from "../components/home/appBarDropDownMenu";
import IconeButtonStack from "../components/home/iconeButtonStack";
import { Loggoute } from "../components/home/loggoute";
import { User } from "../components/home/user";



const StyleHomePage = () => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const styles = useAppSelector(state => state.style.styles);
    const [displayStyle, setDisplayStyle] = useState(styles?.find(s => s.id == styleId));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
            >
                <Toolbar 
                    style={{ 
                        background: theme.palette.primary.main, 
                        minHeight: '48px' 
                    }}>
                    <AppBarDropDownMenu />
                    <Box 
                        sx={{ 
                            flexGrow: 1, 
                            overflow: "hidden", 
                            textOverflow: "ellipsis", 
                            display: 'flex', 
                            justifyContent: 'center' 
                        }}>
                        <Typography>{displayStyle?.orderNumber} : {displayStyle?.name}</Typography>
                    </Box>
                    <User />
                    <Loggoute />
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    pt: '150px',
                    minHeight: '100vh',
                    minWidth: `40px`,
                    background: theme.palette.secondary.main,
                }}
            >
                <IconeButtonStack styleId={styleId} />
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: '16px',
                    pt: '64px',
                    minHeight: '100vh',
                    width: `calc(100% - 40px)`,
                    background: theme.palette.secondary.main,
                }}
            >
                {/* Outlet: Renders the child route's element, if there is one. */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default StyleHomePage;

