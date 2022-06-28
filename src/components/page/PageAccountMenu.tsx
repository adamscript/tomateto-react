import { Avatar, Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useAppSelector } from "../../app/hooks";

const PageAccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const currentUser = useAppSelector((state) => state.currentUser);

    const handleMenu = (e: any) => {
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

    const handleSettings = () => {
        setMenuOpen(false);
        navigate("/settings");
    }
    
    const handleLogOut = () => {
        auth.signOut()
        .then(() => {
            navigate("/accounts/login");
        }) 
    }

    return(
        <Box>
            <IconButton onClick={handleMenu}><Avatar src={currentUser.avatar} sx={{ width: 28, height: 28 }} /></IconButton>
            <Menu anchorEl={anchorEl} 
                    open={menuOpen} 
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
                    <MenuItem>
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
                    <Divider />
                    <MenuItem onClick={handleLogOut}>
                        <ListItemText sx={{ color: "red" }}>Log out</ListItemText>
                    </MenuItem>
                    <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <DarkModeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Dark Mode</ListItemText>
                        </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    )
}

export default PageAccountMenu;