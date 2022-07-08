import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { auth } from "../../firebase";
import { UserRecommendation, UserSkeleton } from "../user";

const ExploreFeedUser = (props: any) => {
    const [response, setResponse] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const authState = useAppSelector((state) => state.authState);

    const listFeedPost = response.slice(0, props.top ? 3 : response.length).map((items, index) => 
        <UserRecommendation key={index} items={items} />
    )

    useEffect(() => {
        function fetchListFeedUser(res?: String){
            fetch("http://localhost:8080/api/user/explore", { 
                mode: 'cors',
                headers: {'Authorization': res ? `Bearer ${res}` : 'none'} 
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setResponse(res.items);
                setLoaded(true);
            })
        }

        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetchListFeedUser(res);
            })
        }
        else{
            console.log("explore not logged")
            fetchListFeedUser();
        }

    }, [])

    return(
        <Stack>
            { isLoaded ? listFeedPost : <UserSkeleton /> }
        </Stack>
    )
}

export default ExploreFeedUser;