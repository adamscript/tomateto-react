import { Box, CircularProgress, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { Comment } from "../comment";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadComments } from "../../features/comment/feedCommentSlice";
import { auth } from "../../firebase";
import { Post } from "../../features/utility/types";

interface PostContentCommentProps {
    response: Post;
}

const PostContentComment = (props: PostContentCommentProps) => {
    const [isLoaded, setLoaded] = useState(false);

    const response = useAppSelector((state) => state.feedComment);
    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);
    const dispatch = useAppDispatch();

    const listPostComment = response.map((items, index) => 
        <Comment key={index} items={items} />
    )

    useEffect(() => {

        function fetchListComment(res?: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/post/content/${props.response.id}/comments`, {
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': res ? `Bearer ${res}` : 'none'}
                })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                dispatch(loadComments(res.items));
                setLoaded(true);
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
                setLoaded(true);
            })
        }

        if(isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetchListComment(res);
            })
        }
        else{
            fetchListComment();
        }


    }, [])

    return(
        <Box display="flex" alignItems="center" justifyContent="center">
            {
                isLoaded ?
                <Stack width="100%">
                    {listPostComment}
                </Stack>
                : <CircularProgress />
            }
        </Box>
    )
}

export default PostContentComment;