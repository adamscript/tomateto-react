import { Box, Tabs, Tab } from "@mui/material";
import React from "react";

const UserPageTabs = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    
    return(
        <Box sx={{ height: "60px" }}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab value="one" label="Posts" />
                <Tab value="two" label="Comments" />
                <Tab value="three" label="Likes" />
            </Tabs>
        </Box>
    )
}

export default UserPageTabs;