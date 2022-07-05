import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ExploreFeedTopPost } from "../components/explore";
import { PageLabel, PageSearchInput } from "../components/page";
import { FeedPost } from "../components/post";
import { UserRecommendation } from "../components/user";
import { loadPosts } from "../features/post/feedPostSlice";
import { auth } from "../firebase";
import Explore from "./Explore";

const Search = () => {
    const [searchParams] = useSearchParams();
    const [postLoaded, setPostLoaded] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    
    const authState = useAppSelector((state) => state.authState);
    const dispatch = useAppDispatch();

    const searchPostItems = useAppSelector((state) => state.feedPost);
    const [searchUserItems, setSearchUserItems] = useState([]);

    const listSearchPost = searchPostItems.map((items, index) => 
        <FeedPost key={index} items={items} />
    )

    const listSearchUser = searchUserItems.map((items, index) => 
        <UserRecommendation key={index} items={items} />
    )

    useEffect(() => {
        function fetchListSearchPost(res?: String){
            fetch(`http://localhost:8080/api/feed/search?q=${searchParams}`, {
                    mode: 'cors',
                    headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
                })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    dispatch(loadPosts(res.items));
                    setPostLoaded(true);
                })
        }

        function fetchListSearchUser(res?: String){
            fetch(`http://localhost:8080/api/user/search?q=${searchParams}`, {
                    mode: 'cors',
                    headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
                })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setSearchUserItems(res.items);
                    setUserLoaded(true);
                })
        }

        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetchListSearchPost(res);
                fetchListSearchUser(res);
            })
        }
        else{
            console.log("search not logged")
            fetchListSearchPost();
            fetchListSearchUser();
        }
    }, [searchParams]);

    useEffect(() => {
        if(postLoaded && userLoaded){
            setLoaded(true);
        }
        else{
            setLoaded(false);
        }
    }, [postLoaded, userLoaded])

    return(
        <Box>
            {listSearchUser.length > 0 && <PageLabel>Tomates</PageLabel>}
            {listSearchUser}
            {listSearchPost.length > 0 && <PageLabel>Posts</PageLabel>}
            {listSearchPost}
            {!isLoaded && <CircularProgress />}
            {!searchParams.get('q') && <Navigate to='/explore' />}
            {listSearchUser.length == 0 && listSearchPost.length == 0 && <Typography variant='h5'>No result found for "{searchParams.get('q')}"</Typography>}
        </Box>
    )
}

export default Search;