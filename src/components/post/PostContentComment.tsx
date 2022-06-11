import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { FeedPost } from "../post";
import { Comment } from "../comment";

const PostContentComment = (props: any) => {
    const [response, setResponse] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const listPostComment = response.map((items, index) => 
    <Comment key={index} items={items} />
    )

    useEffect(() => {

        fetch(`http://localhost:8080/api/post/content/${props.response.id}/comments`, { mode: 'cors' })
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
            {listPostComment}
        </List>
        : <div>Loading...</div>
    )
}

export default PostContentComment;