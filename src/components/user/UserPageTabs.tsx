import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import UserProfileComment from "./UserProfileComment";
import UserProfileLiked from "./UserProfileLiked";
import UserProfilePost from "./UserProfilePost";

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
    const [value, setValue] = React.useState(0);
    
    return(
        <Box>
            <Box sx={{ height: "60px" }}>
                <Tabs value={value} onChange={(e, value) => setValue(value)} variant="fullWidth">
                    <Tab value={0} label="Posts" />
                    <Tab value={1} label="Comments" />
                    <Tab value={2} label="Likes" />
                </Tabs>
            </Box>
            <TabPanel index={0} value={value}>
                <UserProfilePost id={props.response.id} />
            </TabPanel>
            <TabPanel index={1} value={value}>
                <UserProfileComment id={props.response.id} />
            </TabPanel>
            <TabPanel index={2} value={value}>
                <UserProfileLiked id={props.response.id} />
            </TabPanel>
        </Box>
    )
}

export default UserPageTabs;