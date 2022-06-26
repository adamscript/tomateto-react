import { Avatar, Button, Card, CardContent, IconButton, InputBase, Stack } from "@mui/material";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { insertComment } from "../../features/comment/feedCommentSlice";
import { auth } from "../../firebase";
import { incrementCommentsCount } from "../../features/post/feedPostSlice";

interface User{
    id: String;
    displayName: String;
    username: String;
    avatar: String;
}

interface Comment{
    id: number;
    user: User;
    post: number;
    content: String;
    date: String;
    likesCount: number;
    isLiked: boolean;
    isMine: boolean;
}

const NewComment = (props: any) => {
    const [content, setContent] = useState(String);

    const currentUser = useAppSelector((state) => state.currentUser);
    const dispatch = useDispatch();

    const newComment: Comment = {
        id: 0,
        user: {
            id: currentUser.id,
            displayName: currentUser.displayName,
            username: currentUser.username,
            avatar: currentUser.avatar
        },
        post: props.post.id,
        content: content,
        date: "",
        likesCount: 0,
        isLiked: false,
        isMine: true
    }

    const handleComment = () => {

        function fetchInsertComment(res: String){
            fetch('http://localhost:8080/api/comment', {
                mode: 'cors',
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                            'Authorization': `Bearer ${res}`},
                body: JSON.stringify({
                    post: {id: newComment.post},
                    content: newComment.content
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((res: any) => {
                console.log(res)

                newComment.id = res.items.id;
                dispatch(insertComment(newComment));
                dispatch(incrementCommentsCount(props.post.id));
                setContent("");

                console.log(newComment)
            })
        }

        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchInsertComment(res);
        })

    }

    return(
        <Card>
            <CardContent>
                <Stack direction="row" alignItems="start" spacing={1}>
                    <Avatar />
                    <Stack sx={{ width: "100%" }} direction="row" justifyContent="space-between" spacing={1}>
                        <InputBase fullWidth multiline value={content} onChange={(e) => {setContent(e.target.value)}} placeholder="Add a tomathought..." />
                        <Stack direction="row" alignItems="start" spacing={1}>
                            <IconButton>
                                <EmojiEmotionsOutlinedIcon />
                            </IconButton>
                            <Button onClick={handleComment} variant="contained">Comment</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default NewComment;