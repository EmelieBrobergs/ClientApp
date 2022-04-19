
import { AppBar, Box, CssBaseline, Toolbar, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AppBarDropDownMenu from "../components/appBar/appBarDropDownMenu";
import IconeButtonStack, { iconButtonStackWidth } from "../components/style/home/iconeButtonStack";
import { Loggoute } from "../components/appBar/loggoute";
import { User } from "../components/appBar/user";
import EasyInfoBox, { easyInfoBoxWidth } from "../components/style/home/easyInfoBox";
import { styleFetchAsync } from '../reduxSlices/styleSlice';

export const appBarHeight = 48;

const StyleHomePage = () => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const style = useAppSelector(state => state.style.styles?.find(s => s.id == styleId));

    // TODO: Se om denna laddar data vid ny flik ? eller F5   SVAR: Ger data till navbar + easyInfoBox !!
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("effect körs");
        if (styleId) dispatch(styleFetchAsync(styleId));
    }, []);

    return (
        <Box sx={{ display: 'flex', width: '100vw' }}>
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
                        <Typography variant="body1">{style?.styleNumber} : {style?.name}</Typography>
                    </Box>
                    <User />
                    <Loggoute />
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    pt: '150px',
                    minHeight: '100vh',
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
                    minHeight: '100vh',
                    width: { xs: `calc(100% - ${iconButtonStackWidth}px)`, md: `calc(100% - (${iconButtonStackWidth}px + ${easyInfoBoxWidth}px))` },
                    background: theme.palette.secondary.main,
                }}
            >
                {/* Outlet: Renders the child route's element, if there is one. */}
                <Outlet />
            </Box>
            <Box
                sx={{
                    pt: `calc(${appBarHeight}px + 16px)`,
                    minHeight: '100vh',
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

