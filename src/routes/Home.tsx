import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FeedNewPost, FeedPost, PostSkeleton } from "../components/post";
import { loadPosts } from "../features/post/feedPostSlice";
import { auth } from "../firebase";

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
            fetch("http://localhost:8080/api/feed/following", { 
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
            { isLoaded ? listFeedPost : <PostSkeleton /> }
        </Box>
    )
}

export default Home;