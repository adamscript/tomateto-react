import { Stack, IconButton, List, ListItem, ListItemText, Typography, Divider, TextField, Alert, Button, LinearProgress, CircularProgress, styled } from "@mui/material";
import { Box } from "@mui/system";
import { PageLabel } from "../page";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { firebaseErrorHandling } from "../../features/utility";

const StyledForm = styled('form')(() => ({
    width: '100%',
    height: '100%'
}))

const PasswordChar = (props: any) => {
    const [password, setPassword] = useState(String);

    useEffect(() => {
        let char = [];

        for(let i = 0; i < props.children.length; i++){
            char.push('•');
        }

        setPassword(char.toString().replace(/,/g, ""));
    }, [])
    
    return(
        <Typography>{password}</Typography>
    )
}

console.log(auth?.currentUser)

const SettingsAccount = () => {
    const [passwordInput, setPasswordInput] = useState('');
    
    const [isLoading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isReauthenticated, setReauthenticated] = useState(location.state ? true : false);

    useEffect(() => {
        document.title = "Account Information - Tomateto"
    }, [])
    
    const handleConfirm = (e: any) => {
        setLoading(true);

        e.preventDefault();
        
        if(auth.currentUser){
            let credential = auth.currentUser.email ? EmailAuthProvider.credential(auth.currentUser.email, passwordInput) : null;
    
            if(credential){
                reauthenticateWithCredential(auth.currentUser, credential)
                .then(() => {
                    setReauthenticated(true);
                    setLoading(false);
                    setErrorText('');
                })
                .catch((err) => {
                    setLoading(false);
                    setErrorText(firebaseErrorHandling(err));
                })
            }
            else{
                //catch
            }
        }
        else{
            //catch
        }
    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isLoading ? 'center' : 'start', padding: '0 16px' }}>
            <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%' }}>
                <IconButton size="small" onClick={ () => {navigate('../..')} }>
                    <ArrowBackIcon />
                </IconButton>
                <PageLabel>Account Information</PageLabel>
            </Stack>
            
            {
                isLoading ?
                <CircularProgress /> :

                isReauthenticated ? 
                <Stack direction="row" spacing={2}>
                    <List>
                        <ListItem>
                            <ListItemText>
                                Email address
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                Account creation
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
                                {auth?.currentUser?.email} <Link to="email" state={{ getInformation: true }}>Change</Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                {auth?.currentUser?.metadata.creationTime}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <PasswordChar>younaughtynaughtyhacker:P</PasswordChar> <Link to="password" state={{ getInformation: true }}>Change password</Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                                <Link to="delete" state={{ getInformation: true }}>Delete account</Link>
                        </ListItem>
                    </List>
                </Stack>
                :
                <StyledForm onSubmit={handleConfirm}>
                    <Stack spacing={2} width='100%'>
                        <Typography variant="h6">
                            Confirm your password
                        </Typography>
                        <Divider />
                        <TextField id="password-input" label="Password" type="password" value={passwordInput} onChange={(e) => {setPasswordInput(e.target.value)}} error={errorText ? true : false} helperText={errorText} disabled={isLoading} />
                        <Stack spacing={2} direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent="end">
                            <Button variant="contained" type="submit" disabled={isLoading}>Confirm</Button>
                        </Stack>
                    </Stack>
                </StyledForm>
            }
        </Box>
    )
}

export default SettingsAccount;