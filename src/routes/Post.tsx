import { Divider, IconButton, LinearProgress, styled, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Comment, NewComment } from "../components/comment";
import { PageLabel } from "../components/page";
import { PostContent, PostContentComment } from "../components/post";
import { loadPosts } from "../features/post/feedPostSlice";
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

const Post = () => {
    const [isLoaded, setLoaded] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const response = useAppSelector((state) => state.feedPost);
    const dispatch = useAppDispatch();

    const authState = useAppSelector((state) => state.authState);

    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    let { postId } = useParams();

    const handleBack = () => {
        if(location.state){
            navigate(-1);
        }
        else{
            navigate('/');
        }
    }

    useEffect(() => {

        function fetchListPost(res?: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/post/content/${postId}`, { 
            mode: 'cors',
            headers: {'Authorization': res ? `Bearer ${res}` : 'none'} 
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                dispatch(loadPosts(new Array(res.items)));
                setLoaded(true)

                document.title = `${res.items.user.displayName} on Tomateto: "${res.items.content.length > 64 ? res.items.content.substring(0, 60) + "..." : res.items.content}" - Tomateto`;
            })
        }
        
        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetchListPost(res);
            })
        }
        else{
            fetchListPost();
        }

    }, [])

    return(
        isLoaded ?
        <Box>
            <PageTopNavigation>
                <IconButton onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>
                <PageLabel>Post</PageLabel>
            </PageTopNavigation>
            { smDown && <Offset /> }
            <PostContent inputRef={inputRef} response={response[0]} />
            <Divider variant="middle" />
            <NewComment ref={inputRef} post={response[0]} />
            { !smDown && <Divider variant="middle" /> }
            <PostContentComment response={response[0]} />
        </Box>
        : <LinearProgress />
    )
}

export default Post;