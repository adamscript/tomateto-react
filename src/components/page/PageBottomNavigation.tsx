import { Avatar, BottomNavigation, BottomNavigationAction, Box, Button, Stack, styled } from "@mui/material"
import { useAppSelector } from "../../app/hooks";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from "react-router-dom";

const PageBottomNavigation = () => {
    const currentUser = useAppSelector((state) => state.currentUser);
    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <Box>
            {
                isLoggedIn ?
                <BottomNavigation>
                    <BottomNavigationAction onClick={() => { navigate('/') }} icon={ location.pathname == '/' ? <HomeRoundedIcon sx={{ color: theme => theme.palette.text.primary }} fontSize="large" /> : <HomeOutlinedIcon sx={{ color: theme => theme.palette.text.primary }} fontSize="large" /> } />
                    <BottomNavigationAction onClick={() => { navigate('/explore') }} icon={<SearchIcon sx={{ color: theme => theme.palette.text.primary, stroke: theme => theme.palette.text.primary, strokeWidth: location.pathname == '/explore' ? 1 : 0 }} fontSize="large" />} />
                    <BottomNavigationAction onClick={() => { navigate(`/${currentUser.username}`) }} icon={<Avatar src={currentUser?.avatar?.extraSmall} sx={{ width: 32, height: 32 }} />} />
                </BottomNavigation> :
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" padding={2}>
                    <Button variant="outlined" onClick={() => { navigate('/accounts/login') }} sx={{ width: '100%' }}>Log in</Button>
                    <Button variant="contained" onClick={() => { navigate('/accounts/signup') }} sx={{ width: '100%' }}>Sign up</Button>
                </Stack>
            }
        </Box>
    )
}

export default PageBottomNavigation;