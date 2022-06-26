import { Stack, IconButton, List, ListItem, ListItemText, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { PageLabel } from "../page";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

const PasswordChar = (props: any) => {
    const [password, setPassword] = useState(String);

    useEffect(() => {
        let char = [];

        for(let i = 0; i < props.children.length; i++){
            char.push('•');
        }

        setPassword(char.toString().replace(/,/g, ""));
    })
    
    return(
        <Typography>{password}</Typography>
    )
}

const SettingsAccount = () => {
    const navigate = useNavigate();

    return(
        <Box>
            <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%' }}>
                <IconButton onClick={ () => {navigate('..')} }>
                    <ArrowBackIcon />
                </IconButton>
                <PageLabel>Account Information</PageLabel>
            </Stack>
            <Stack direction="row" spacing={2}>
                <List>
                    <ListItem>
                        <ListItemText>
                            Email address
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            Password
                        </ListItemText>
                    </ListItem>
                </List>
                <List>
                    <ListItem>
                        <ListItemText>
                            {auth?.currentUser?.email} <Link href="#" underline="hover">Change</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <PasswordChar>younaughtynaughtyhacker:P</PasswordChar> <Link href="#" underline="hover">Reset password</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                            <Link href="#" underline="hover" sx={{ color: "red" }}>Delete account</Link>
                    </ListItem>
                </List>
            </Stack>
        </Box>
    )
}

export default SettingsAccount;