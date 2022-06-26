import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { auth } from "../../firebase";
import { UserRecommendation } from "../user";
import CloseIcon from '@mui/icons-material/Close';

const PageLink = (props: any) => {
    const location = useLocation();

    return(
        <Box>
            {
                (props.following && <Link to="following" state={{ backgroundLocation: location, user: props.items.id }}>{props.items.followCount} Following{ props.items.followCount > 1 && 's' }</Link>) ||
                (props.followers && <Link to="followers" state={{ backgroundLocation: location, user: props.items.id }}>{props.items.followersCount} Follower{ props.items.followersCount > 1 && 's' }</Link>) ||
                (props.likes && <Link to="likes" state={{ backgroundLocation: location, post: props.items.id }}>{props.items.likesCount} Like{ props.items.likesCount > 1 && 's' }</Link>)
            }
        </Box>
    )
}

const PageLinkModal = (props: any) => {
    const [response, setResponse] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const authState = useAppSelector((state) => state.authState)
    
    const navigate = useNavigate();
    const { username, postId } = useParams();

    const listUser = response.map((items, index) =>
        <UserRecommendation key={index} items={items} />
    )

    const handleClose = () => {
        navigate("..");
    }

    useEffect(() => {

        function fetchListUserFollowing(res?: String){
            fetch(`http://localhost:8080/api/user/${username}/follows`, {
                mode: 'cors',
                headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                handleFetchSuccess(res);
            })
        }

        function fetchListUserFollowers(res?: String){
            fetch(`http://localhost:8080/api/user/${username}/followers`, {
                mode: 'cors',
                headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                handleFetchSuccess(res);
            })
        }

        function fetchListPostLikes(res?: String){
            fetch(`http://localhost:8080/api/post/content/${postId}/likes`, {
                mode: 'cors',
                headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                handleFetchSuccess(res);
            })
        }

        function handleFetchSuccess(res: any){
            setResponse(res.items);
            setLoaded(true)
        }

        function handleFetch(res?: String){
            if(props.following){
                res ? fetchListUserFollowing(res) : fetchListUserFollowing();
            }
            else if(props.followers){
                res ? fetchListUserFollowers(res) : fetchListUserFollowers();
            }
            else if(props.likes){
                res ? fetchListPostLikes(res) : fetchListPostLikes();
            }
        }
        
        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                handleFetch(res);
            })
        }

    }, [response]);

    return(
        <Box>
            <Dialog open fullWidth onClose={handleClose}>
                <DialogTitle>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    {
                        (props.following && 'Following') ||
                        (props.followers && 'Followers') ||
                        (props.likes && 'Liked by')
                    }
                </DialogTitle>
                <DialogContent>
                    { isLoaded && listUser }
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export { PageLink, PageLinkModal };