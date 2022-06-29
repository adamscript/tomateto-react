import * as React from 'react';
import { Box, Tab, Tabs } from "@mui/material";

const ExplorePageTabs = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    
    return(
        <Box>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Top" />
                <Tab value="two" label="Post" />
                <Tab value="three" label="Tomates" />
            </Tabs>
        </Box>
    )
}

export default ExplorePageTabs;