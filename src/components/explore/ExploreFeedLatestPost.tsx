import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { FeedPost } from "../post";

const ExploreFeedLatestPost = () => {
    const [response, setResponse] = useState([]);

    const listFeedPost = response.map((items, index) => 
    <FeedPost key={index} items={items} />
    )

    useEffect(() => {

        fetch("http://localhost:8080/api/feed/latest", { mode: 'cors' })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            setResponse(res.items);
        })

    }, [])

    return(
        <List>
            {listFeedPost}
        </List>
    )
}

export default ExploreFeedLatestPost;