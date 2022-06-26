import { List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { PageLabel } from "../components/page";

const Settings = () => {
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('profile');
    }

    const handleAccount = () => {
        navigate('account');
    }

    return(
        <Box>
            <Stack>
                <PageLabel>Settings</PageLabel>
                <List disablePadding dense>
                    <ListItem>
                        <ListItemButton onClick={handleProfile}>
                            <ListItemText
                                primary="Edit Profile"
                                secondary="Customize your profile information"
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={handleAccount}>
                            <ListItemText
                                primary="Account Information"
                                secondary="See your account information"
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Stack>
        </Box>
    )
}

export default Settings;