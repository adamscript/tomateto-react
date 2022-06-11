import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FeedPost } from "../components/post";
import { UserProfile, UserPageTabs } from "../components/user";

const User = () => {
    const [response, setResponse] = useState(Object);
    const [isLoaded, setLoaded] = useState(false);

    const { username } = useParams();

    useEffect(() => {

        fetch(`http://localhost:8080/api/user/profile/${username}`, { mode: 'cors' })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            setResponse(res.items);
            setLoaded(true)
        })

    }, [])

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