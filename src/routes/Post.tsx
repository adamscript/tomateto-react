import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Comment, NewComment } from "../components/comment";
import { PostContent, PostContentComment } from "../components/post";

const Post = () => {
    const [response, setResponse] = useState(Object);
    const [isLoaded, setLoaded] = useState(false);

    let { postId } = useParams();

    useEffect(() => {

        fetch(`http://localhost:8080/api/post/content/${postId}`, { mode: 'cors' })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            setResponse(res.items);
            setLoaded(true)
        })

    }, [])

    return(
        isLoaded ?
        <Box>
            <PostContent response={response} />
            <NewComment />
            <PostContentComment response={response} />
        </Box>
        : <div>Loading...</div>
    )
}

export default Post;