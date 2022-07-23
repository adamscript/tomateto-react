import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, SvgIcon } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { PageLabel } from "../components/page";

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';

import { ReactComponent as TomatetoDarkIcon } from "../logos/tomatetodark-icon.svg";
import { useEffect } from "react";

const Settings = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Settings - Tomateto"
    })

    const handleProfile = () => {
        navigate('profile');
    }

    const handleAccount = () => {
        navigate('account');
    }

    const handlePassword = () => {
        navigate('account/password');
    }

    return(
        <Box>
            <Stack>
                <PageLabel>Settings</PageLabel>
                <List disablePadding dense>
                    <ListItem>
                        <ListItemButton onClick={handleProfile}>
                            <ListItemIcon>
                                <SvgIcon component={TomatetoDarkIcon} inheritViewBox />
                            </ListItemIcon>
                            <ListItemText
                                primary="Edit Profile"
                                secondary="Customize your profile information"
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={handleAccount}>
                            <ListItemIcon>
                                <PersonOutlineIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Account Information"
                                secondary="See your account information"
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={handlePassword}>
                            <ListItemIcon>
                                <KeyOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Change Password"
                                secondary="Change your password at any time"
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Stack>
        </Box>
    )
}

export default Settings;