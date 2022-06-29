import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Comment, NewComment } from "../components/comment";
import { PostContent, PostContentComment } from "../components/post";
import { loadPosts } from "../features/post/feedPostSlice";
import { auth } from "../firebase";

const Post = () => {
    const [isLoaded, setLoaded] = useState(false);
    const inputRef = useRef();

    const response = useAppSelector((state) => state.feedPost);
    const dispatch = useAppDispatch();

    const authState = useAppSelector((state) => state.authState);

    let { postId } = useParams();

    useEffect(() => {

        function fetchListPost(res?: String){
            fetch(`http://localhost:8080/api/post/content/${postId}`, { 
            mode: 'cors',
            headers: {'Authorization': res ? `Bearer ${res}` : 'none'} 
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                dispatch(loadPosts(new Array(res.items)));
                setLoaded(true)
            })
        }
        
        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetchListPost(res);
            })
        }
        else{
            fetchListPost();
        }

    }, [])

    return(
        isLoaded ?
        <Box>
            <PostContent inputRef={inputRef} response={response[0]} />
            <Divider variant="middle" />
            <NewComment ref={inputRef} post={response[0]} />
            <Divider variant="middle" />
            <PostContentComment response={response[0]} />
        </Box>
        : <div>Loading...</div>
    )
}

export default Post;