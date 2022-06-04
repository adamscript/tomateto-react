import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

const PageSideButton = () => {
    return(
        <List sx={{ position: 'fixed' }}>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <ExploreOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Explore" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <Avatar />
                    <Stack>
                        <Typography>Tabby Avery</Typography>
                        <Typography>@catinthepiratehat</Typography>
                    </Stack>
                </ListItemButton>
            </ListItem>
        </List>
    )
};

export default PageSideButton;