import { Tabs, Tab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { ExploreFeedLatestPost, ExploreFeedTopPost, ExploreFeedUser } from "../components/explore";
import { PageLabel, PageShowMore } from "../components/page";
import { FeedPost } from "../components/post";
import { UserRecommendation } from "../components/user";

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
    const [value, setValue] = React.useState(0);

    return(
        <Box>
            <Box>
                <Tabs value={value} onChange={(e, value) => setValue(value)}>
                    <Tab value={0} label="Top" />
                    <Tab value={1} label="Post" />
                    <Tab value={2} label="Tomates" />
                </Tabs>
            </Box>
            <TabPanel index={0} value={value}>
                <PageLabel>Tomates to follow</PageLabel>
                <ExploreFeedUser />
                <PageShowMore onClick={() => setValue(2)} />
                <PageLabel>Top Posts</PageLabel>
                <ExploreFeedTopPost />
            </TabPanel>
            <TabPanel index={1} value={value}>
                <PageLabel>Latest Posts</PageLabel>
                <ExploreFeedLatestPost />
            </TabPanel>
            <TabPanel index={2} value={value}>
                <PageLabel>Tomates for you</PageLabel>
                <ExploreFeedUser />
            </TabPanel>
        </Box>
    )
}

export default Explore;