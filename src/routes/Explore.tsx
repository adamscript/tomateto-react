import { Tabs, Tab, Divider, styled, Slide, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement, useRef, useState } from "react";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { ExploreFeedLatestPost, ExploreFeedTopPost, ExploreFeedUser } from "../components/explore";
import { PageLabel, PageSearchInput, PageShowMore } from "../components/page";
import { PostSkeleton } from "../components/post";
import { loadPosts } from "../features/post/feedPostSlice";
import { auth } from "../firebase";

interface TabPanelProps {
    value: string;
    index: string;
    children: ReactElement[];
}

function TabPanel(props: TabPanelProps) {
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
        maxWidth: value == 'top' && 24 || value == 'latest' && 32 || value == 'user' && 56,
        width: '100%',
        backgroundColor: theme.palette.text.primary,
    },
}));

interface StyledTabProps {
    label: string;
    value: string;
  }

const StyledTab = styled((props: StyledTabProps) => (
    <Tab {...props} />
  ))(({ theme }) => ({
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 400,
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.text.primary,
      fontWeight: 500
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }));

const Explore = () => {
    const [value, setValue] = useState("top");
    const [isLoaded, setLoaded] = useState(false);

    const authState = useAppSelector((state) => state.authState);
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        document.title = "Explore - Tomateto"

        function fetchListFeedPost(res?: string){
            if(value == "top" || value == "latest"){
                fetch(`${process.env.REACT_APP_API_URL}/api/feed/${value}`, {
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
            <Box sx={{ position: 'sticky', top: smDown ? 0 : 60, backgroundColor: theme => theme.palette.background.default, zIndex: 2 }}>
                <StyledTabs value={value} onChange={(e, value) => { setValue(value); setLoaded(false); }}>
                    <StyledTab value="top" label="Top" />
                    <StyledTab value="latest" label="Post" />
                    <StyledTab value="user" label="Tomates" />
                </StyledTabs>
                <Divider />
            </Box>
            <Box>
                <TabPanel index="top" value={value}>
                <PageLabel>Tomates to follow</PageLabel>
                    <ExploreFeedUser top />
                    <PageShowMore textPadding={1} height={60} onClick={() => { setValue("user") }}>Show more</PageShowMore>
                    <Divider />
                    <PageLabel>Top Posts</PageLabel>
                    { isLoaded ? <ExploreFeedTopPost /> : <PostSkeleton /> }
                </TabPanel>
                <TabPanel index="latest" value={value}>
                    <PageLabel>Latest Posts</PageLabel>
                    { isLoaded ? <ExploreFeedLatestPost /> : <PostSkeleton /> }
                </TabPanel>
                <TabPanel index="user" value={value}>
                    <PageLabel>Tomates for you</PageLabel>
                    <ExploreFeedUser />
                </TabPanel>
            </Box>
        </Box>
    )
}

export default Explore;