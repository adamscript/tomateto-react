import { CircularProgress, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { Comment } from "../comment";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadComments } from "../../features/comment/feedCommentSlice";
import { auth } from "../../firebase";

const PostContentComment = (props: any) => {
    const [isLoaded, setLoaded] = useState(false);

    const response = useAppSelector((state) => state.feedComment);
    const dispatch = useAppDispatch();

    const listPostComment = response.map((items, index) => 
    <Comment key={index} items={items} />
    )

    useEffect(() => {

        function fetchListComment(res?: String){
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
            })
        }

        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchListComment(res);
        })

    }, [])

    return(
        <Stack alignItems="center">
            {        
                isLoaded ?
                <Stack width="100%">
                    {listPostComment}
                </Stack>
                : <CircularProgress />
            }
        </Stack>
    )
}

export default PostContentComment;