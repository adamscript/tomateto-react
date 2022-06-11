import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { FeedNewPost, FeedPost } from "../components/post";

const Home = () => {
    const [response, setResponse] = useState([]);

    const listFeedPost = response.map((items, index) => 
        <FeedPost key={index} items={items} />
    )

    useEffect(() => {

        fetch("http://localhost:8080/api/feed", { mode: 'cors' })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            setResponse(res.items);
        })

    }, [])

    return(
        <Box>
            <FeedNewPost />
            {listFeedPost}
        </Box>
    )
}

export default Home;