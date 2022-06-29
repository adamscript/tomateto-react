import { alpha, styled } from "@mui/material";
import { useState } from "react";
import { auth } from "../../firebase";
import { LoadingButton } from '@mui/lab';

const UnfollowButton = styled(LoadingButton)(({ theme }) => ({
    color: theme.palette.text.primary, 
    borderColor: theme.palette.action.focus,
    '&:hover': {
        color: theme.palette.error.main,
        borderColor: alpha(theme.palette.error.main, theme.palette.action.focusOpacity),
        backgroundColor: alpha(theme.palette.error.main, theme.palette.action.focusOpacity)

    }
})) as typeof LoadingButton;

const PageFollowButton = (props: any) => {
    const [isLoading, setLoading] = useState(false);
    const [isFollowed, setFollowed] = useState(props.items.isFollowed);
    const [followedLabel, setFollowedLabel] = useState('Followed');

    const handleFollow = () => {
        setLoading(true);

        function fetchFollowUser(res: String){
            fetch(`http://localhost:8080/api/user/${props.items.id}/follow`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .then((res) => {
                setLoading(false);
                setFollowed(true);
            })
        }
        
        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchFollowUser(res);
        })
    }

    const handleUnfollow = () => {
        setLoading(true);

        function fetchFollowUser(res: String){
            fetch(`http://localhost:8080/api/user/${props.items.id}/unfollow`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .then((res) => {
                setLoading(false);
                setFollowed(false);
            })
        }
        
        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchFollowUser(res);
        })
    }

    return(
        isFollowed ?
            <UnfollowButton loading={isLoading} variant="outlined" onClick={handleUnfollow} onMouseOver={() => setFollowedLabel('Unfollow')} onMouseOut={() => setFollowedLabel('Followed')}>{ followedLabel }</UnfollowButton> :
            <LoadingButton loading={isLoading} variant="contained" onClick={handleFollow}>Follow</LoadingButton>
    )
}

export default PageFollowButton;