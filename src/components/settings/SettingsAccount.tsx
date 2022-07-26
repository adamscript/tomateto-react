import { Stack, IconButton, List, ListItem, ListItemText, Typography, Divider, TextField, Alert, Button, LinearProgress, CircularProgress, styled } from "@mui/material";
import { Box } from "@mui/system";
import { PageLabel } from "../page";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { firebaseErrorHandling } from "../../features/utility";
import insertErrorLog from "../../features/utility/errorLogging";

const StyledForm = styled('form')(() => ({
    width: '100%',
    height: '100%'
}))

const LinkTypography = styled(Typography)(({ theme }) => ({
    display: 'inline',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: 14,
    '&:hover': {
        textDecoration: 'underline'
    }
})) as typeof Typography;

interface PasswordCharProps {
    children: string;
}

const PasswordChar = (props: PasswordCharProps) => {
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
    
    const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
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
                    insertErrorLog("Reauthenticate with credential / handleConfirm / SettingsAccount", err);
                })
            }
            else{
                insertErrorLog("Getting credential / handleConfirm / SettingsAccount");
            }
        }
        else{
            insertErrorLog("Getting auth current User / handleConfirm / SettingsAccount");
        }
    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isLoading ? 'center' : 'start', padding: '0 16px', width: '100%' }}>
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
                        <ListItem sx={{ alignItems: 'flex-start' }}>
                            <ListItemText sx={{ maxWidth: '160px', width: '100%' }}>
                                Email address
                            </ListItemText>
                            <Typography noWrap>{auth?.currentUser?.email}</Typography>
                            <LinkTypography component={Link} to="email" state={{ getInformation: true }}>Change</LinkTypography>
                        </ListItem>
                        <ListItem sx={{ alignItems: 'flex-start' }}>
                            <ListItemText sx={{ maxWidth: '160px', width: '100%' }}>
                                Account creation
                            </ListItemText>
                            <ListItemText>
                                {auth?.currentUser?.metadata.creationTime}
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{ alignItems: 'flex-start' }}>
                            <ListItemText sx={{ maxWidth: '160px', width: '100%' }}>
                                Password
                            </ListItemText>
                            <ListItemText>
                                <PasswordChar>younaughtynaughtyhacker:P</PasswordChar> <LinkTypography component={Link} to="password" state={{ getInformation: true }}>Change password</LinkTypography>
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{ alignItems: 'flex-start' }}>
                            <Box sx={{ maxWidth: '160px', width: '100%' }} />
                            <LinkTypography component={Link} to="delete" state={{ getInformation: true }} sx={{ color: theme => theme.palette.error.dark }}>Delete account</LinkTypography>
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