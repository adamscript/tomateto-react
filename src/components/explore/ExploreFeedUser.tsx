import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openSnackbarError } from "../../features/app/snackbarSlice";
import insertErrorLog from "../../features/utility/errorLogging";
import { auth } from "../../firebase";
import { UserRecommendation, UserSkeleton } from "../user";

interface ExploreFeedUserProps {
    top?: boolean;
}

const ExploreFeedUser = (props: ExploreFeedUserProps) => {
    const [response, setResponse] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const authState = useAppSelector((state) => state.authState);
    const dispatch = useAppDispatch();

    const listFeedPost = response.slice(0, props.top ? 3 : response.length).map((items, index) => 
        <UserRecommendation key={index} items={items} />
    )

    useEffect(() => {
        function fetchListFeedUser(res?: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/user/explore`, { 
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
            .catch((err) => {
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                insertErrorLog("Fetching User for explore feed / fetchListFeedUser / ExploreFeedUser", err);
            })
        }

        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetchListFeedUser(res);
            })
            .catch((err) => {
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                insertErrorLog("Get Id token / ExploreFeedUser", err);
            })
        }
        else{
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