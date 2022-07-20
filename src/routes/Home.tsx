import { Box, Button, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FeedNewPost, FeedPost, PostSkeleton } from "../components/post";
import { loadPosts } from "../features/post/feedPostSlice";
import { auth } from "../firebase";

const LinkTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
})) as typeof Typography;

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
        function fetchListFeedPost(res: String){
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
        }
        
        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchListFeedPost(res);
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
                <Button onClick={() => { navigate('/explore') }} variant="contained" sx={{ width: 120 }}>Explore</Button>
            </Stack>
        </Box>
    )
}

export default Home;