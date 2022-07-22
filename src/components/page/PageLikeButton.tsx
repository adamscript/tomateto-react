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

const PostLikeButton = (props: any) => {
    const dispatch = useDispatch();
    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);

    const navigate = useNavigate();

    const handleLike = () =>{
        function fetchLikePost(res: String){
            dispatch(likePost(props.items));

            fetch(`${process.env.REACT_APP_API_URL}/api/post/${props.items.id}/like`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .catch((res) => {
                dispatch(unlikePost(props.items));
                dispatch(openSnackbarError("An error occurred while processing your request"));
            })
        }

        function fetchUnlikePost(res: String){
            dispatch(unlikePost(props.items));

            fetch(`${process.env.REACT_APP_API_URL}/api/post/${props.items.id}/unlike`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .catch((res) => {
                dispatch(likePost(props.items));
                dispatch(openSnackbarError("An error occurred while processing your request"));
            })
        }

        function fetchLikeComment(res: String){
            dispatch(likeComment(props.items));

            fetch(`${process.env.REACT_APP_API_URL}/api/comment/${props.items.id}/like`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .catch((res) => {
                dispatch(unlikeComment(props.items));
                dispatch(openSnackbarError("An error occurred while processing your request"));
            })
        }

        function fetchUnlikeComment(res: String){
            dispatch(unlikeComment(props.items));

            fetch(`${process.env.REACT_APP_API_URL}/api/comment/${props.items.id}/unlike`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .catch((res) => {
                dispatch(likeComment(props.items));
                dispatch(openSnackbarError("An error occurred while processing your request"));
            })
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
        }
        else{
            navigate('/accounts/login', { state: { 
                isLoggedIn: false
            } })
        }
    }
    
    return(
        <Stack direction={ (props.feed && "row") || (props.comment && "column") } alignItems="center">
            <IconButton onClick={handleLike} size={ props.content ? "medium" : "small" } sx={{ color: theme => props.items.isLiked ? "tomato" : theme.palette.text.secondary, zIndex: 1 }}>
                { props.items.isLiked ? <FavoriteIcon fontSize="inherit" /> : <FavoriteBorderOutlinedIcon fontSize="inherit" /> }
            </IconButton>
            { props.feed || props.comment ? <Typography variant="body2" sx={{ color: theme => props.items.isLiked ? "tomato" : theme.palette.text.secondary }}>{ props.items.likesCount > 0 && props.items.likesCount }</Typography> : <></> }
        </Stack>
    )
}

export default PostLikeButton;