import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { FeedPost } from "../post";
import { UserRecommendation } from "../user";

const ExploreFeedUser = () => {
    const [response, setResponse] = useState([]);

    const listFeedPost = response.map((items, index) => 
        <UserRecommendation key={index} items={items} />
    )

    useEffect(() => {

        fetch("http://localhost:8080/api/user/explore", { mode: 'cors' })
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

export default ExploreFeedUser;