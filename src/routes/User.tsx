import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { FeedPost } from "../components/post";
import { UserProfile, UserPageTabs } from "../components/user";
import { auth } from "../firebase";

const User = () => {
    const [response, setResponse] = useState(Object);
    const [isLoaded, setLoaded] = useState(false);

    const authState = useAppSelector((state) => state.authState);

    const { username } = useParams();

    useEffect(() => {        
        function fetchListUser(res?: String){
            fetch(`http://localhost:8080/api/user/profile/${username}`, {
                mode: 'cors',
                headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setResponse(res.items);
                setLoaded(true)
            })
        }
        
        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetchListUser(res);
            })
        }
        else{
            fetchListUser();
        }

    }, [username])

    return(
        isLoaded ?
        <Box>
            <UserProfile response={response} />
            <UserPageTabs response={response} />
        </Box>
        : <div>Loading...</div>
    )
}

export default User;