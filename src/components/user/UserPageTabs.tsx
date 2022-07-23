import { Box, Tabs, Tab, Stack, styled, Divider, useMediaQuery, useTheme, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loadPosts } from "../../features/post/feedPostSlice";
import { loadComments } from "../../features/comment/feedCommentSlice";
import { FeedPost } from "../post";
import UserProfileComment from "./UserProfileComment";
import UserProfileLiked from "./UserProfileLiked";
import UserProfilePost from "./UserProfilePost";
import { useLocation, useParams } from "react-router-dom";
import { auth } from "../../firebase";

function TabPanel(props: any) {
    const { value, index } = props;
  
    return (
      <StyledTabPanel
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
      >
        {props.children}
      </StyledTabPanel>
    );
  }

const StyledTabPanel = styled('div')(() => ({
    display: 'flex',
    
    width: '100%',
    justifyContent: 'center'
}));

interface StyledTabsProps {
    children?: React.ReactNode;
    value: string;
    onChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
    ))<StyledTabsProps>(({ theme, value }) => ({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: value == 'posts' && 48 || value == 'comments' && 80 || value == 'liked' && 48,
        width: '100%',
        backgroundColor: theme.palette.text.primary,
    },
})) as typeof Tabs;

interface StyledTabProps {
    label: string;
    value: string;
  }

const StyledTab = styled((props: StyledTabProps) => (
    <Tab {...props} />
  ))(({ theme }) => ({
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.text.primary,
      fontWeight: 700
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }));

const UserPageTabs = (props: any) => {
    const [value, setValue] = useState("posts");
    const [isLoaded, setLoaded] = useState(false);

    const authState = useAppSelector((state) => state.authState);
    const dispatch = useAppDispatch();

    const location = useLocation();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (e: any, value: string) => {
        setLoaded(false);
        setValue(value);
    }

    useEffect(() => {
        console.log(isLoaded)
        function fetchListFeedPost(res?: String){
            fetch(`${process.env.REACT_APP_API_URL}/api/user/profile/${props.response.id}/${value}`, { 
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
    })
    
    return(
        <Box width="100%">
            <Box sx={{ position: smDown ? 'sticky' : 'static', top: 60, backgroundColor: theme => theme.palette.background.default, zIndex: 2 }}>
                <StyledTabs value={value} onChange={handleChange} variant="fullWidth">
                    <StyledTab value="posts" label="Posts" />
                    <StyledTab value="comments" label="Comments" />
                    <StyledTab value="liked" label="Liked" />
                </StyledTabs>
                <Divider />
            </Box>
            <TabPanel index="posts" value={value}>
                { isLoaded ? <UserProfilePost /> : <CircularProgress /> }
            </TabPanel>
            <TabPanel index="comments" value={value}>
                { isLoaded ? <UserProfileComment /> : <CircularProgress /> }
            </TabPanel>
            <TabPanel index="liked" value={value}>
                { isLoaded ? <UserProfileLiked /> : <CircularProgress /> }
            </TabPanel>
        </Box>
    )
}

export default UserPageTabs;