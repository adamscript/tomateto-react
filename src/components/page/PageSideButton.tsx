import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { useNavigate } from "react-router-dom";

const PageSideButton = (props: any) => {
    const navigate = useNavigate();

    return(
        <List sx={{ position: 'fixed' }}>
            <ListItem sx={{ display: props.isLoggedIn ? 'block' : 'none' }}>
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
            <ListItem sx={{ display: props.isLoggedIn ? 'block' : 'none' }}>
                <ListItemButton>
                    <Avatar />
                    <Stack>
                        <Typography>{props.response.displayName}</Typography>
                        <Typography>@{props.response.username}</Typography>
                    </Stack>
                </ListItemButton>
            </ListItem>
        </List>
    )
};

export default PageSideButton;