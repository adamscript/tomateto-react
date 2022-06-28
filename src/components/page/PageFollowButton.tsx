import { Button } from "@mui/material";
import { useState } from "react";
import { auth } from "../../firebase";
import { LoadingButton } from '@mui/lab';

const PageFollowButton = (props: any) => {
    const [isLoading, setLoading] = useState(false);
    const [isFollowed, setFollowed] = useState(props.items.isFollowed);

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
            <LoadingButton loading={isLoading} variant="outlined" onClick={handleUnfollow}>Followed</LoadingButton> :
            <LoadingButton loading={isLoading} variant="contained" onClick={handleFollow}>Follow</LoadingButton>
    )
}

export default PageFollowButton;