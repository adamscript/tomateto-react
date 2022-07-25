import { Box, CircularProgress, Stack, Typography } from "@mui/material";
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
        document.title = `${searchParams.get('q')} - Tomateto`;

        function fetchListSearchPost(res?: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/feed/search?q=${searchParams.get('q')}`, {
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

        function fetchListSearchUser(res?: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/user/search?q=${searchParams.get('q')}`, {
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: !isLoaded ? 'center' : 'stretch' }}>
            {
                !isLoaded ? 
                <CircularProgress /> :
                <Box>
                    {listSearchUser.length > 0 && <PageLabel>Tomates</PageLabel>}
                    {listSearchUser}
                    {listSearchPost.length > 0 && <PageLabel>Posts</PageLabel>}
                    {listSearchPost}
                    {!searchParams.get('q') && <Navigate to='/explore' />}
                    {listSearchUser.length == 0 && listSearchPost.length == 0 && <NoSearchFound q={searchParams.get('q')} />}
                </Box>
            }
        </Box>
    )
}

interface NoSearchFoundProps {
    q: string | null;
}

const NoSearchFound = (props: NoSearchFoundProps) => {
    return(
        <Box sx={{ p: 5 }}>
            <Stack spacing={3} alignItems="center" justifyContent="center">    
                <Typography variant="h5" align="center" sx={{ fontWeight: 700 }}>No results found for "{props.q}"</Typography>
                <Typography align="center">Try searching with less or different keywords.</Typography>
            </Stack>
        </Box>
    )
}

export default Search;