import { Box, Dialog, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Slide, Stack, styled, SvgIcon, SwipeableDrawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { forwardRef, ReactElement, Ref, useState } from "react";

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

import { ReactComponent as TomatetoLightLogo } from "../../logos/tomatetolight-logo.svg";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setDarkMode, setLightMode } from "../../features/app/darkModeSlice";
import PageLabel from "./PageLabel";
import { TransitionProps } from "@mui/material/transitions";

const LinkTypography = styled(Typography)(({ theme }) => ({
    display: 'inline-flex',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
})) as typeof Typography;

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.text.secondary,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PageInfoMenu = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);
    const darkMode = useAppSelector((state) => state.darkMode.value);
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
        if(menuOpen){
            setMenuOpen(false);
            setAnchorEl(null);
        }
        else{
            setAnchorEl(e.currentTarget);
            setMenuOpen(true);
        }
    }

    const handleMenuClose = () => {
        setMenuOpen(false);
        setAnchorEl(null);
    };

    const handleDarkMode = () => {
        if(darkMode){
            dispatch(setLightMode());
        }
        else{
            dispatch(setDarkMode());
        }
    }
    
    const handleAbout = () => {
        setAboutOpen(true);
        setMenuOpen(false);
    }

    const handleAboutClose = () => {
        setAboutOpen(false);
        setAnchorEl(null);
    };

    return(
        !isLoggedIn ?
        <Box>
            <IconButton onClick={handleMenu} size="small">
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} 
                    open={ smDown ? false : menuOpen } 
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 12,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        },
                    }}>
                <MenuList  sx={{ width: 240 }}>
                    <MenuItem onClick={handleDarkMode}>
                        <ListItemIcon>
                            { darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon /> }
                        </ListItemIcon>
                        <ListItemText>{darkMode ? 'Light' : 'Dark'} mode</ListItemText>
                    </MenuItem>
                    <Divider variant="middle" />
                    <MenuItem onClick={handleAbout}>
                        <ListItemIcon>
                            <InfoOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>About</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>

            <SwipeableDrawer anchor="bottom" open={ smDown ? menuOpen : false} onOpen={handleMenu} onClose={handleMenuClose} disableSwipeToOpen>
                <Box sx={{ height: 12, backgroundColor: 'transparent' }}>
                    <Puller />
                </Box>
                <List>
                    <ListItem onClick={handleDarkMode}>
                        <ListItemIcon>
                            { darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon /> }
                        </ListItemIcon>
                        <ListItemText>{darkMode ? 'Light' : 'Dark'} mode</ListItemText>
                    </ListItem>
                    <ListItem onClick={handleAbout}>
                        <ListItemIcon>
                            <InfoOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>About</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>

            <Dialog open={aboutOpen} onClose={handleAboutClose} fullScreen={smDown} TransitionComponent={ smDown ? Transition : undefined }>
                <Box padding="0 16px 32px">
                    <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%', position: 'sticky', top: 0, background: 'rgba(0,0,0,0)', zIndex: 1 }}>
                        <IconButton size="small" onClick={ () => { setAboutOpen(false) } }>
                            <CloseIcon />
                        </IconButton>
                        <PageLabel>About Tomateto</PageLabel>
                    </Stack>
                    <Stack spacing={2} sx={{ display: 'inline-flex', padding:"0 16px" }}>
                        <SvgIcon sx={{ maxWidth: '320px', width: '100%', height: '120px' }} component={TomatetoLightLogo} inheritViewBox />
                        <Typography>
                            Tomateto is a personal project built by Adam Darmawan as a means to learn full-stack web development.
                        </Typography>
                        <Typography>
                            You can find him on various social medias (including Tomateto) as @adamscript and @awantobreakfree. His inbox is also open at adam@adamscript.com and ajiaditya27@gmail.com. If you have any questions, suggestions, or just want to let him know how awesome he is, feel free to send him a dm. He'll really appreciate it (and probably cry a little bit, depends on what you tell him).
                        </Typography>
                        <Typography sx={{ display: 'inline-flex' }}>Finally, you can learn more about the creator of Tomateto on his personal website.</Typography>
                        <LinkTypography component='a' href="https://www.adamscript.com">adamscript.com</LinkTypography>
                    </Stack>
                </Box>
            </Dialog>
        </Box> :
        <></>
    )
}

export default PageInfoMenu;