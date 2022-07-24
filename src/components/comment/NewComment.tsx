import { Avatar, Button, Box, IconButton, InputBase, Stack, styled, useMediaQuery, useTheme, LinearProgress } from "@mui/material";
import React, { ForwardedRef, forwardRef, MutableRefObject, ReactElement, RefObject, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { insertComment } from "../../features/comment/feedCommentSlice";
import { auth } from "../../firebase";
import { incrementCommentsCount } from "../../features/post/feedPostSlice";
import { PageEmojiButton } from "../page";
import { LoadingButton } from "@mui/lab";
import { Comment, Post } from "../../features/utility/types";

const NewCommentContainer = styled(Box)(({theme}) => ({
    padding: 16,
    position: 'static',
    backgroundColor: theme.palette.background.default,
    
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 2
    }
})) as typeof Box;

const StyledAvatar = styled(Avatar)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        width: 36,
        height: 36
    }
})) as typeof Avatar;

interface NewCommentProps {
    post: Post;
}

const NewComment = forwardRef<HTMLInputElement, NewCommentProps>((props, ref) => {
    const [content, setContent] = useState(String);
    const [isPosting, setPosting] = useState(false);

    const currentUser = useAppSelector((state) => state.currentUser);
    const dispatch = useDispatch();

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleEmojiSelect = (emoji: any) => {
        if(ref && typeof ref !== 'function'){
            setContent(ref.current?.value + emoji.native);
        }
    }

    const newComment: Comment = {
        id: 0,
        user: {
            id: currentUser.id,
            displayName: currentUser.displayName,
            username: currentUser.username,
            avatar: currentUser.avatar,
            followCount: currentUser.followCount,
            followersCount: currentUser.followersCount,
            postsCount: currentUser.postsCount,
            isMine: currentUser.isMine 
        },
        post: props.post.id,
        content: content,
        date: new Date().toISOString(),
        likesCount: 0,
        isLiked: false,
        isMine: true
    }

    const handleComment = () => {
        setPosting(true);

        function fetchInsertComment(res: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/comment`, {
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
            .then((res) => {
                newComment.id = res.items.id;
                dispatch(insertComment(newComment));
                dispatch(incrementCommentsCount(props.post.id));
                setContent("");
                setPosting(false);

                console.log(newComment)
            })
            .catch((err) => {
                setPosting(false);
            })
        }

        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchInsertComment(res);
        })
        .catch((err) => {
            setPosting(false);
        })

    }

    return(
        <Box>
            { isPosting && <LinearProgress /> }
            <NewCommentContainer>
                <Stack direction="row" alignItems={ smUp ? "start" : "end" } spacing={1}>
                    <StyledAvatar src={currentUser?.avatar?.small} />
                    <Stack sx={{ width: "100%" }} direction="row" justifyContent="space-between" spacing={1}>
                        <InputBase inputRef={ref} fullWidth multiline value={content} inputProps={{ maxLength: 2200 }} onChange={(e) => {setContent(e.target.value)}} placeholder="Add a tomathought..." />
                        <Stack direction="row" alignItems={ smUp ? "start" : "end" } spacing={1}>
                            {
                                smUp && 
                                <PageEmojiButton onEmojiSelect={handleEmojiSelect} />
                            }
                            <LoadingButton loading={isPosting} disabled={content ? false : true} onClick={handleComment} variant="contained">Comment</LoadingButton>
                        </Stack>
                    </Stack>
                </Stack>
            </NewCommentContainer>
        </Box>
    )
})

export default NewComment;