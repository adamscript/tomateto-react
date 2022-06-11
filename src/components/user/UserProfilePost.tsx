import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { FeedPost } from "../post";

const UserProfilePost = (props: any) => {
    const [response, setResponse] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const listProfilePost = response.map((items, index) => 
    <FeedPost key={index} items={items} />
    )

    useEffect(() => {

        fetch(`http://localhost:8080/api/user/profile/${props.id}/posts`, { mode: 'cors' })
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
            {listProfilePost}
        </List>
        : <div>Loading...</div>
    )
}

export default UserProfilePost;