import { alpha, Box, Button, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FeedNewPost, FeedPost, PostSkeleton } from "../components/post";
import { openSnackbarError } from "../features/app/snackbarSlice";
import { loadPosts } from "../features/post/feedPostSlice";
import insertErrorLog from "../features/utility/errorLogging";
import { auth } from "../firebase";

const StyledButton = styled(Button)(({ theme }) => ({
    color: '#FFFFFF',
    backgroundColor: '#FF6347',
    borderColor: theme.palette.action.focus,
    '&:hover': {
        borderColor: alpha(theme.palette.error.main, theme.palette.action.focusOpacity),
        backgroundColor: '#B21807'

    }
})) as typeof Button;

const Home = () => {
    const [isLoaded, setLoaded] = useState(false);

    const response = useAppSelector((state) => state.feedPost);
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const listFeedPost = response.map((items, index) => 
        <FeedPost key={index} items={items} />
    )

    useEffect(() => {
        document.title = "Tomateto";

        function fetchListFeedPost(res: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/feed/following`, { 
                mode: 'cors',
                headers: {'Authorization': `Bearer ${res}`} 
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                dispatch(loadPosts(res.items));
                setLoaded(true);
            })
            .catch((err) => {
                setLoaded(true);
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                insertErrorLog("Fetching Post for home page / Home", err);
            })
        }
        
        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchListFeedPost(res);
        })
        .catch((err) => {
            setLoaded(true);
            dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
            insertErrorLog("Get Id Token / Home", err);
        })

    }, [])

    return(
        <Box>
            { smUp && <FeedNewPost /> }
            { isLoaded ? (listFeedPost.length ? listFeedPost : <NoFeedPostFound />) : <PostSkeleton /> }

        </Box>
    )
}

const NoFeedPostFound = () => {
    const navigate = useNavigate();

    return(
        <Box sx={{ p: 5 }}>
            <Stack spacing={3} alignItems="center" justifyContent="center">    
                <Typography variant="h5" align="center" sx={{ fontWeight: 700 }}>Looks like you haven't followed anyone.</Typography>
                <Typography align="center">Explore and find Tomates to follow!</Typography>
                <StyledButton onClick={() => { navigate('/explore') }} variant="contained" sx={{ width: 120 }}>Explore</StyledButton>
            </Stack>
        </Box>
    )
}

export default Home;