import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { FeedPost } from "../post";

const ExploreFeedTopPost = () => {
    const [response, setResponse] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const listFeedPost = response.map((items, index) => 
    <FeedPost key={index} items={items} />
    )

    useEffect(() => {

        fetch("http://localhost:8080/api/feed/top", { mode: 'cors' })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            setResponse(res.items);
            setLoaded(true);
        })

    }, [])

    return(
        isLoaded ?
        <List>
            {listFeedPost}
        </List>
        : <div>Loading...</div>
    )
}

export default ExploreFeedTopPost;