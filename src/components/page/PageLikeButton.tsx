import { Stack, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { unlikePost, likePost } from "../../features/post/feedPostSlice";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likeComment, unlikeComment } from "../../features/comment/feedCommentSlice";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { openSnackbarError } from "../../features/app/snackbarSlice";
import { Comment, Post } from "../../features/utility/types";
import insertErrorLog from "../../features/utility/errorLogging";

interface PageLikeButtonProps {
    items: Post | Comment;
    comment?: boolean;
    feed?: boolean;
    content?: boolean;
}

function instanceOfPost(object:any): object is Post {
    return 'id' in object;
}

function instanceOfComment(object:any): object is Comment {
    return 'id' in object;
} 

const PageLikeButton = (props: PageLikeButtonProps) => {
    const dispatch = useDispatch();
    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);

    const navigate = useNavigate();

    const handleLike = () =>{
        function fetchLikePost(res: string){
            if(instanceOfPost(props.items)){
                dispatch(likePost(props.items));
    
                fetch(`${process.env.REACT_APP_API_URL}/api/post/${props.items.id}/like`, {
                        mode: 'cors',
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${res}`}
                    })
                .catch((err) => {
                    if(instanceOfPost(props.items)){
                        dispatch(unlikePost(props.items));
                        dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));

                        insertErrorLog("Fetch Put Like Post / fetchLikePost / handleLike / PageLikeButton", err);
                    }
                })
            }
        }

        function fetchUnlikePost(res: string){
            if(instanceOfPost(props.items)){
                dispatch(unlikePost(props.items));
    
                fetch(`${process.env.REACT_APP_API_URL}/api/post/${props.items.id}/unlike`, {
                        mode: 'cors',
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${res}`}
                    })
                .catch((err) => {
                    if(instanceOfPost(props.items)){
                        dispatch(likePost(props.items));
                        dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));

                        insertErrorLog("Fetch Put Unlike Post / fetchUnlikePost / handleLike / PageLikeButton", err);
                    }
                })
            }
        }

        function fetchLikeComment(res: string){
            if(instanceOfComment(props.items)){
                dispatch(likeComment(props.items));
    
                fetch(`${process.env.REACT_APP_API_URL}/api/comment/${props.items.id}/like`, {
                        mode: 'cors',
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${res}`}
                    })
                .catch((err) => {
                    if(instanceOfComment(props.items)){
                        dispatch(unlikeComment(props.items));
                        dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));

                        insertErrorLog("Fetch Put Like Comment / fetchLikeComment / handleLike / PageLikeButton", err);
                    }
                })
            }
        }

        function fetchUnlikeComment(res: string){
            if(instanceOfComment(props.items)){
                dispatch(unlikeComment(props.items));
    
                fetch(`${process.env.REACT_APP_API_URL}/api/comment/${props.items.id}/unlike`, {
                        mode: 'cors',
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${res}`}
                    })
                .catch((err) => {
                    if(instanceOfComment(props.items)){
                        dispatch(likeComment(props.items));
                        dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));

                        insertErrorLog("Fetch Put Unlike Comment / fetchLikeComment / handleLike / PageLikeButton", err);
                    }
                })
            }
        }

        if(isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                if(props.items.isLiked){
                    if(props.comment){
                        fetchUnlikeComment(res);
                    }
                    else{
                        fetchUnlikePost(res);
                    }
                }
                else{
                    if(props.comment){
                        fetchLikeComment(res);
                    }
                    else{
                        fetchLikePost(res);
                    }
                }
            })
            .catch((err) => {
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                insertErrorLog("Get id token / handleLike / PageLikeButton", err);
            })
        }
        else{
            navigate('/accounts/login', { state: { 
                isLoggedIn: false
            } })
        }
    }
    
    return(
        <Stack direction={ props.feed ? "row" : "column" } alignItems="center">
            <IconButton onClick={handleLike} size={ props.content ? "medium" : "small" } sx={{ color: theme => props.items.isLiked ? "tomato" : theme.palette.text.secondary, zIndex: 1 }}>
                { props.items.isLiked ? <FavoriteIcon fontSize="inherit" /> : <FavoriteBorderOutlinedIcon fontSize="inherit" /> }
            </IconButton>
            { props.feed || props.comment ? <Typography variant="body2" sx={{ color: theme => props.items.isLiked ? "tomato" : theme.palette.text.secondary }}>{ props.items.likesCount && props.items.likesCount > 0 ? props.items.likesCount : null }</Typography> : <></> }
        </Stack>
    )
}

export default PageLikeButton;