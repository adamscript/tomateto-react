import { Box, IconButton, Stack, styled, useMediaQuery, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { PageAccountMenu, PageLabel } from "../components/page";
import { FeedPost } from "../components/post";
import { UserProfile, UserPageTabs } from "../components/user";
import { auth } from "../firebase";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageTopNavigation = styled(Box)(({theme}) => ({
    position: 'fixed',
    top: 0,
    paddingLeft: 12,
    width: '100vw',
    zIndex: 2,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.up('sm')]: {
        display: 'none'
    }
})) as typeof Box;

const Offset = styled('div')(({theme}) => theme.mixins.toolbar);

const User = () => {
    const [response, setResponse] = useState(Object);
    const [isLoaded, setLoaded] = useState(false);

    const authState = useAppSelector((state) => state.authState);

    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { username } = useParams();

    const handleBack = () => {
        if(location.state){
            navigate(-1);
        }
        else{
            navigate('/');
        }
    }

    useEffect(() => {        
        function fetchListUser(res?: String){
            fetch(`${process.env.REACT_APP_API_URL}/api/user/profile/${username}`, {
                mode: 'cors',
                headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if(!res.code){
                    setResponse(res.items);
                    setLoaded(true)
                }
                else{
                    navigate('/404');
                }
            })
        }
        
        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetchListUser(res);
            })
        }
        else{
            fetchListUser();
        }

    }, [location])

    return(
        isLoaded ?
        <Box>
            <PageTopNavigation>
                <IconButton onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 'calc(100% - 60px)' }}>
                    <PageLabel>Tomate</PageLabel>
                    { response.isMine && <PageAccountMenu drawer /> }
                </Stack>
            </PageTopNavigation>
            { smDown && <Offset /> }
            <UserProfile response={response} />
            <UserPageTabs response={response} />
        </Box>
        : <div>Loading...</div>
    )
}

export default User;