import { Avatar, BottomNavigation, BottomNavigationAction, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';

const SideNavigationContainer = styled(Box)(({theme}) => ({
    position: 'fixed',
    width: 80,

    [theme.breakpoints.up('md')]: {
        width: 240
    }

})) as typeof Box;

const PageSideNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);
    const currentUser = useAppSelector((state) => state.currentUser);

    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    return(
        <SideNavigationContainer>
            <List sx={{ mt: 1 }}>
                <ListItem sx={{ display: isLoggedIn ? 'block' : 'none' }} disablePadding>
                    <ListItemButton disableRipple={ !mdUp && true } onClick={() => navigate("/")}>
                        <ListItemIcon sx={{ color: theme => theme.palette.text.primary }}>
                            { location.pathname == '/' ? <HomeRoundedIcon fontSize="large" /> : <HomeOutlinedIcon fontSize="large" /> }
                        </ListItemIcon>
                            {
                                mdUp &&
                                <ListItemText disableTypography>
                                    <Typography variant="h6" sx={{ fontWeight: location.pathname == '/' ? 700 : 400 }}>
                                        Home
                                    </Typography>
                                </ListItemText>
                            }
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton disableRipple={ !mdUp && true } onClick={() => navigate("/explore")}>
                        <ListItemIcon sx={{ color: theme => theme.palette.text.primary }}>
                            { location.pathname == '/explore' || location.pathname == '/search' ? <ExploreRoundedIcon fontSize="large" /> : <ExploreOutlinedIcon fontSize="large" /> }
                        </ListItemIcon>
                            {
                                mdUp &&
                                <ListItemText disableTypography>
                                    <Typography variant="h6" sx={{ fontWeight: location.pathname == '/explore' || location.pathname == '/search' ? 700 : 400 }}>
                                        Explore
                                    </Typography>
                                </ListItemText>
                            }
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{ display: isLoggedIn ? 'block' : 'none', m: 2, ml: 0 }} disablePadding>
                    <ListItemButton disableRipple={ !mdUp && true } onClick={() => { navigate(`/${currentUser.username}`) }}>
                        <Stack direction="row" spacing={2} alignItems="center">    
                            <Avatar src={currentUser.avatar} />
                            {
                                mdUp &&
                                <Stack>
                                    <Typography sx={{ fontWeight: 700 }}>{currentUser.displayName}</Typography>
                                    <Typography sx={{ color: theme => theme.palette.text.secondary }}>@{currentUser.username}</Typography>
                                </Stack>
                            }
                        </Stack>
                    </ListItemButton>
                </ListItem>
            </List>
        </SideNavigationContainer>
    )
};

export default PageSideNavigation;