import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, styled, SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";
import { createContext, ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setLightMode, setDarkMode } from "../../features/app/darkModeSlice";
import insertErrorLog from "../../features/utility/errorLogging";
import { openSnackbarError } from "../../features/app/snackbarSlice";

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.text.secondary,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

interface PageAccountMenuProps {
    drawer?: boolean;
}

const PageAccountMenu = (props: PageAccountMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const currentUser = useAppSelector((state) => state.currentUser);
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

    const handleProfile = () => {
        setMenuOpen(false);
        navigate(`/${currentUser.username}`);
    }

    const handleSettings = () => {
        setMenuOpen(false);
        navigate("/settings");
    }

    const handleDarkMode = () => {
        if(darkMode){
            dispatch(setLightMode());
        }
        else{
            dispatch(setDarkMode());
        }
    }
    
    const handleLogOut = () => {
        auth.signOut()
        .then(() => {
            navigate("/accounts/login");
        })
        .catch((err) => {
            dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
            insertErrorLog("Logging out / handleLogOut / PageAccountMenu", err);
        })
    }

    return(
        <Box>
            <IconButton onClick={handleMenu}>
                {
                    props.drawer ?
                    <MenuIcon /> :
                    <Avatar src={currentUser?.avatar?.extraSmall} sx={{ width: 28, height: 28 }} />
                }
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
                            right: 18,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}>
                <MenuList  sx={{ width: 240 }}>
                    <MenuItem onClick={handleProfile}>
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleSettings}>
                        <ListItemIcon>
                            <SettingsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <Divider variant="middle" />
                        <MenuItem onClick={handleDarkMode}>
                            <ListItemIcon>
                                { darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon /> }
                            </ListItemIcon>
                            <ListItemText>{darkMode ? 'Light' : 'Dark'} mode</ListItemText>
                        </MenuItem>
                    <Divider variant="middle" />
                    <MenuItem onClick={handleLogOut}>
                        <ListItemText sx={{ color: "red" }}>Log out</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>

            <SwipeableDrawer anchor="bottom" open={ smDown ? menuOpen : false} onOpen={handleMenu} onClose={handleMenuClose} disableSwipeToOpen>
                <Box sx={{ height: 12, backgroundColor: 'transparent' }}>
                    <Puller />
                </Box>
                <List>
                    <ListItem onClick={handleSettings}>
                        <ListItemIcon>
                            <SettingsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </ListItem>
                    <ListItem onClick={handleDarkMode}>
                        <ListItemIcon>
                            { darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon /> }
                        </ListItemIcon>
                        <ListItemText>{darkMode ? 'Light' : 'Dark'} mode</ListItemText>
                    </ListItem>
                    <ListItem onClick={handleLogOut}>
                        <ListItemText sx={{ color: "red" }}>Log out</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </Box>
    )
}

export default PageAccountMenu;