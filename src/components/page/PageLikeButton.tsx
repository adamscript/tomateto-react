import { Stack, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { unlikePost, likePost } from "../../features/post/feedPostSlice";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likeComment, unlikeComment } from "../../features/comment/feedCommentSlice";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const PostLikeButton = (props: any) => {
    const dispatch = useDispatch();
    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);

    const navigate = useNavigate();

    const handleLike = () =>{
        function fetchLikePost(res: String){
            fetch(`http://localhost:8080/api/post/${props.items.id}/like`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .then((res) => {
                dispatch(likePost(props.items));
            })
        }

        function fetchUnlikePost(res: String){
            fetch(`http://localhost:8080/api/post/${props.items.id}/unlike`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .then((res) => {
                dispatch(unlikePost(props.items));
            })
        }

        function fetchLikeComment(res: String){
            fetch(`http://localhost:8080/api/comment/${props.items.id}/like`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .then((res) => {
                dispatch(likeComment(props.items));
            })
        }

        function fetchUnlikeComment(res: String){
            fetch(`http://localhost:8080/api/comment/${props.items.id}/unlike`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .then((res) => {
                dispatch(unlikeComment(props.items));
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
            <IconButton onClick={handleLike} size={ props.content ? "medium" : "small" } sx={{ color: theme => props.items.isLiked ? "red" : theme.palette.text.secondary, zIndex: 1 }}>
                { props.items.isLiked ? <FavoriteIcon fontSize="inherit" /> : <FavoriteBorderOutlinedIcon fontSize="inherit" /> }
            </IconButton>
            { props.feed || props.comment ? <Typography variant="body2" sx={{ color: theme => props.items.isLiked ? "red" : theme.palette.text.secondary }}>{ props.items.likesCount > 0 && props.items.likesCount }</Typography> : <></> }
        </Stack>
    )
}

export default PostLikeButton;