import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Collapse, Container, Link, NextUIProvider, Row, Text} from '@nextui-org/react';
import {CacheProvider} from "@emotion/react";
import {Drawer, IconButton, ThemeProvider, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';
import PropTypes from "prop-types";
import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {AdminPanelSettings, Liquor, LocalBar} from '@mui/icons-material';
import {useRouter} from "next/router";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const clientSideEmotionCache = createEmotionCache();

// @ts-ignore
function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache}: AppProps) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const router = useRouter();

    return(
        <ApolloProvider client={client}>
        <NextUIProvider>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={lightTheme}>
                    <Container>
                        <AppBar>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                            variant="persistent"
                            anchor="left"
                            open={open}
                        >
                            <DrawerHeader>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            </DrawerHeader>
                            <Divider />
                            <Collapse.Group>
                                <Collapse title="Personal" contentLeft={<Liquor ></Liquor >}>
                                    {['Dashboard', 'Bar', 'Collections', 'Recipes'].map((text, index) => (
                                        <Text key={index}>
                                            <Link block onClick={()=>{router.push(`/personal/${text.toLowerCase().replace(/\s/g, "")}`)}} >
                                                {text}
                                            </Link>
                                        </Text>
                                    ))}
                                </Collapse>
                                <Collapse title="Cocktails" contentLeft={<LocalBar ></LocalBar >}>
                                    {['All', 'Aperitif', 'Cocktail','Long Drink','Ordinary Drink','Party Drink','Shot'].map((text, index) => (
                                        <Text key={index}>
                                            <Link block onClick={()=>{router.push(`/cocktails/${text.toLowerCase().replace(/\s/g, "")}`)}}>
                                                {text}
                                            </Link>
                                        </Text>
                                    ))}
                                </Collapse>
                                <Collapse title="Admin" contentLeft={<AdminPanelSettings ></AdminPanelSettings >}>
                                    {['Users', 'Ingredients', 'Categories','Pumps','Events'].map((text, index) => (
                                        <Text key={index}>
                                            <Link block onClick={()=>{router.push(`/admin/${text.toLowerCase().replace(/\s/g, "")}`)}}>
                                                {text}
                                            </Link>
                                        </Text>
                                    ))}
                                </Collapse>
                            </Collapse.Group>
                        </Drawer>
                        <Main open={open}>
                            <DrawerHeader />
                        </Main>
                        <Component {...pageProps} />
                    </Container>
                </ThemeProvider>
            </CacheProvider>
        </NextUIProvider>
        </ApolloProvider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};

export default MyApp
