import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { current } from "@reduxjs/toolkit";

const PageSideButton = () => {
    const navigate = useNavigate();

    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);
    const currentUser = useAppSelector((state) => state.currentUser);

    return(
        <List sx={{ position: 'fixed' }}>
            <ListItem sx={{ display: isLoggedIn ? 'block' : 'none' }}>
                <ListItemButton onClick={() => navigate("/")}>
                    <ListItemIcon>
                        <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => navigate("/explore")}>
                    <ListItemIcon>
                        <ExploreOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Explore" />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{ display: isLoggedIn ? 'block' : 'none' }}>
                <ListItemButton onClick={() => { navigate(`/${currentUser.username}`) }}>
                    <Avatar src={currentUser.avatar} />
                    <Stack>
                        <Typography>{currentUser.displayName}</Typography>
                        <Typography>@{currentUser.username}</Typography>
                    </Stack>
                </ListItemButton>
            </ListItem>
        </List>
    )
};

export default PageSideButton;