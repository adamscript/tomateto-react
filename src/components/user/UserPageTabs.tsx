import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loadPosts } from "../../features/post/feedPostSlice";
import { loadComments } from "../../features/comment/feedCommentSlice";
import { FeedPost } from "../post";
import UserProfileComment from "./UserProfileComment";
import UserProfileLiked from "./UserProfileLiked";
import UserProfilePost from "./UserProfilePost";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase";

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

const UserPageTabs = (props: any) => {
    const [value, setValue] = React.useState("posts");
    const [isLoaded, setLoaded] = React.useState(false);

    const authState = useAppSelector((state) => state.authState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        function fetchListFeedPost(res?: String){
            fetch(`http://localhost:8080/api/user/profile/${props.response.id}/${value}`, { 
                mode: 'cors',
                headers: {'Authorization': res ? `Bearer ${res}` : 'none'} 
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if(value == "posts" || value == "liked"){
                    dispatch(loadPosts(res.items));
                }
                else if(value == "comments"){
                    dispatch(loadComments(res.items));
                }
                setLoaded(true);
            })
        }

        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetchListFeedPost(res);
            })
        }
        else{
            fetchListFeedPost();
        }
    }, [value])
    
    return(
        <Box>
            <Box sx={{ height: "60px" }}>
                <Tabs value={value} onChange={(e, value) => setValue(value)} variant="fullWidth">
                    <Tab value="posts" label="Posts" />
                    <Tab value="comments" label="Comments" />
                    <Tab value="liked" label="Liked" />
                </Tabs>
            </Box>
            <TabPanel index="posts" value={value}>
                <UserProfilePost />
            </TabPanel>
            <TabPanel index="comments" value={value}>
                <UserProfileComment />
            </TabPanel>
            <TabPanel index="liked" value={value}>
                <UserProfileLiked />
            </TabPanel>
        </Box>
    )
}

export default UserPageTabs;