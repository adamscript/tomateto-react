import { Tabs, Tab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { ExploreFeedLatestPost, ExploreFeedTopPost, ExploreFeedUser } from "../components/explore";
import { PageLabel, PageShowMore } from "../components/page";
import { FeedPost } from "../components/post";
import { UserRecommendation } from "../components/user";
import { loadPosts } from "../features/post/feedPostSlice";
import { auth } from "../firebase";

function TabPanel(props: any) {
    const { value, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
      >
        {props.children}
      </div>
    );
  }

const Explore = () => {
    const [value, setValue] = React.useState("top");
    const [isLoaded, setLoaded] = React.useState(false);

    const authState = useAppSelector((state) => state.authState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        function fetchListFeedPost(res?: String){
            if(value == "top" || value == "latest"){
                fetch(`http://localhost:8080/api/feed/${value}`, {
                    mode: 'cors',
                    headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
                })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    dispatch(loadPosts(res.items));
                    setLoaded(true);
                })
            }
            else{
                setLoaded(true);
            }
        }

        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetchListFeedPost(res);
            })
        }
        else{
            console.log("explore not logged")
            fetchListFeedPost();
        }
    }, [value])

    return(
        <Box>
            <Box>
                <Tabs value={value} onChange={(e, value) => { setValue(value); setLoaded(false); }}>
                    <Tab value="top" label="Top" />
                    <Tab value="latest" label="Post" />
                    <Tab value="user" label="Tomates" />
                </Tabs>
            </Box>
            {isLoaded ?
            <Box>
                <TabPanel index="top" value={value}>
                    {
                        authState.isLoggedIn &&
                        <><PageLabel>Tomates to follow</PageLabel>
                        <ExploreFeedUser />
                        <PageShowMore onClick={() => setValue("user")} /></>
                    }
                    <PageLabel>Top Posts</PageLabel>
                    <ExploreFeedTopPost />
                </TabPanel>
                <TabPanel index="latest" value={value}>
                    <PageLabel>Latest Posts</PageLabel>
                    <ExploreFeedLatestPost />
                </TabPanel>
                <TabPanel index="user" value={value}>
                    <PageLabel>Tomates for you</PageLabel>
                    <ExploreFeedUser />
                </TabPanel>
            </Box>
            : <div>Loading...</div>}
        </Box>
    )
}

export default Explore;