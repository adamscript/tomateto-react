import { Avatar, BottomNavigation, BottomNavigationAction, Box, styled } from "@mui/material"
import { useAppSelector } from "../../app/hooks";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from "react-router-dom";

const Offset = styled('div')(({theme}) => theme.mixins.toolbar);

const PageBottomNavigation = () => {
    const currentUser = useAppSelector((state) => state.currentUser);

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <Box>
            <BottomNavigation>
                <BottomNavigationAction onClick={() => { navigate('/') }} icon={ location.pathname == '/' ? <HomeRoundedIcon sx={{ color: theme => theme.palette.text.primary }} fontSize="large" /> : <HomeOutlinedIcon sx={{ color: theme => theme.palette.text.primary }} fontSize="large" /> } />
                <BottomNavigationAction onClick={() => { navigate('/explore') }} icon={<SearchIcon sx={{ color: theme => theme.palette.text.primary, stroke: theme => theme.palette.text.primary, strokeWidth: location.pathname == '/explore' ? 1 : 0 }} fontSize="large" />} />
                <BottomNavigationAction onClick={() => { navigate(`/${currentUser.username}`) }} icon={<Avatar src={currentUser.avatar} sx={{ width: 32, height: 32 }} />} />
            </BottomNavigation>
        </Box>
    )
}

export default PageBottomNavigation;