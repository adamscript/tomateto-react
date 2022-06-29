import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';

const PageSideButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);
    const currentUser = useAppSelector((state) => state.currentUser);

    return(
        <Box sx={{ position: 'fixed', width: 240 }}>
            <List sx={{ mt: 1 }}>
                <ListItem sx={{ display: isLoggedIn ? 'block' : 'none' }} disablePadding>
                    <ListItemButton onClick={() => navigate("/")}>
                        <ListItemIcon sx={{ color: theme => theme.palette.text.primary }}>
                            { location.pathname == '/' ? <HomeRoundedIcon fontSize="large" /> : <HomeOutlinedIcon fontSize="large" /> }
                        </ListItemIcon>
                        <ListItemText disableTypography>
                            <Typography variant="h6" sx={{ fontWeight: location.pathname == '/' ? 700 : 400 }}>
                                Home
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/explore")}>
                        <ListItemIcon sx={{ color: theme => theme.palette.text.primary }}>
                            { location.pathname == '/explore' || location.pathname == '/search' ? <ExploreRoundedIcon fontSize="large" /> : <ExploreOutlinedIcon fontSize="large" /> }
                        </ListItemIcon>
                        <ListItemText disableTypography>
                            <Typography variant="h6" sx={{ fontWeight: location.pathname == '/explore' || location.pathname == '/search' ? 700 : 400 }}>
                                Explore
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{ display: isLoggedIn ? 'block' : 'none', m: 2, ml: 0 }} disablePadding>
                    <ListItemButton onClick={() => { navigate(`/${currentUser.username}`) }}>
                        <Stack direction="row" spacing={2} alignItems="center">    
                            <Avatar src={currentUser.avatar} />
                            <Stack>
                                <Typography sx={{ fontWeight: 700 }}>{currentUser.displayName}</Typography>
                                <Typography sx={{ color: theme => theme.palette.text.secondary }}>@{currentUser.username}</Typography>
                            </Stack>
                        </Stack>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
};

export default PageSideButton;