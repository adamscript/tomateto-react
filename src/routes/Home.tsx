import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FeedNewPost, FeedPost } from "../components/post";
import { loadPosts } from "../features/post/feedPostSlice";
import { auth } from "../firebase";

const Home = () => {
    const [isLoaded, setLoaded] = useState(false);

    const response = useAppSelector((state) => state.feedPost);
    const dispatch = useAppDispatch();

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
            <FeedNewPost />
            {isLoaded ? listFeedPost : <div>Loading...</div>}
        </Box>
    )
}

export default Home;