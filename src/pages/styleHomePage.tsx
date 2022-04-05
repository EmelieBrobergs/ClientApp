
import { AppBar, Box, CssBaseline, Toolbar, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import AppBarDropDownMenu from "../components/appBar/appBarDropDownMenu";
import IconeButtonStack, { iconButtonStackWidth } from "../components/style/home/iconeButtonStack";
import { Loggoute } from "../components/appBar/loggoute";
import { User } from "../components/appBar/user";
import EasyInfoBox from "../components/style/home/easyInfoBox";

export const appBarHeight = 48;

const StyleHomePage = () => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const style = useAppSelector(state => state.style.styles?.find(s => s.id == styleId));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
            >
                <Toolbar
                    style={{
                        background: theme.palette.primary.main,
                        minHeight: `${appBarHeight}px`,
                        maxHeight: `${appBarHeight}px`
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
                        <Typography variant="body1">{style?.orderNumber} : {style?.name}</Typography>
                    </Box>
                    <User />
                    <Loggoute />
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    pt: '150px',
                    minHeight: '100vh', //Går denna att lägga på huvudboxen ?
                    minWidth: `${iconButtonStackWidth}px`,
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
                    pt: `calc(${appBarHeight}px + 16px)`,
                    minHeight: '100vh', //Går denna att lägga på huvudboxen ?
                    width: `calc(100% - ${iconButtonStackWidth}px)`,  //?? behövs utränkninh?
                    background: theme.palette.secondary.main,
                }}
            >
                {/* Outlet: Renders the child route's element, if there is one. */}
                <Outlet />
            </Box>
            <Box
                sx={{
                    pt: `calc(${appBarHeight}px + 16px)`,
                    minHeight: '100vh', //Går denna att lägga på huvudboxen ?
                    background: theme.palette.secondary.dark,
                    display: { xs: 'none', md: 'block' }
                }}
            >
                <EasyInfoBox styleId={style?.id} />
            </Box>
        </Box>
    );
};

export default StyleHomePage;

