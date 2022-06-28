import { List } from "@mui/material";
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
            fetch(`http://localhost:8080/api/post/content/${props.response.id}/comments`, {
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
        isLoaded ?
        <List>
            {listPostComment}
        </List>
        : <div>Loading...</div>
    )
}

export default PostContentComment;