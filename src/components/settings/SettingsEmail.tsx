import { Alert, Button, CircularProgress, Divider, IconButton, LinearProgress, Stack, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PageLabel } from "../page";
import { useLocation, useNavigate } from "react-router-dom";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from "firebase/auth";
import { firebaseErrorHandling } from "../../features/utility";

const StyledForm = styled('form')(() => ({
    width: '100%',
    height: '100%'
}))

const SettingsEmail = () => {
    const [currentEmailInput, setCurrentEmailInput] = useState(auth?.currentUser?.email);
    const [newEmailInput, setNewEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    
    const [isLoading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [errorAlertMessage, setErrorAlertMessage] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isReauthenticated, setReauthenticated] = useState(location.state ? true : false);

    useEffect(() => {
        document.title = "Change Email - Tomateto";
    }, [])

    const handleConfirm = (e: any) => {
        setLoading(true);

        e.preventDefault();
        
        if(auth.currentUser){
            let credential =  auth.currentUser.email ? EmailAuthProvider.credential(auth.currentUser.email, passwordInput) : null;
            
            if(credential){
                reauthenticateWithCredential(auth.currentUser, credential)
                .then(() => {
                    setReauthenticated(true);
                    setLoading(false);
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
    }

    const handleChangeEmail = (e: any) => {
        setLoading(true);

        e.preventDefault();

        if(auth.currentUser){
            updateEmail(auth.currentUser, newEmailInput)
            .then(() => {
                setLoading(false);
                setCurrentEmailInput(newEmailInput);
                setNewEmailInput('');
                setErrorText('');
                setErrorAlertMessage('');
            })
            .catch((err) => {
                setLoading(false);
                setErrorAlertMessage(firebaseErrorHandling(err));
            })
        }
        else{
            //catch
        }
        
    }

    return(
        <Box padding="0 16px">
            <Stack spacing={2}>
                <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%' }}>
                    <IconButton size="small" onClick={ () => { location.state ? navigate('..', { state: { reaunthenticated: true }}) : navigate('/settings') } }>
                        <ArrowBackIcon />
                    </IconButton>
                    <PageLabel>Change Email</PageLabel>
                </Stack>
                { isLoading && <LinearProgress /> }
                {
                    isReauthenticated ?
                    <StyledForm onSubmit={handleChangeEmail}>
                        <Stack spacing={2}>
                            <TextField disabled id="currentemail" label="Current email" value={currentEmailInput} />
                            <TextField id="newemail-input" label="New email" value={newEmailInput} onChange={(e) => {setNewEmailInput(e.target.value)}} disabled={isLoading} />
                            <Divider />
                            <Stack direction="row" sx={{ width: '100%' }} justifyContent={ errorAlertMessage ? "space-between" : "end" }>
                                { errorAlertMessage && <Alert severity="error">{errorAlertMessage}</Alert> }
                                <Button variant="contained" type="submit" disabled={isLoading || !newEmailInput}>Save</Button>
                            </Stack>
                        </Stack>
                    </StyledForm>
                    :
                    <StyledForm onSubmit={handleConfirm}>
                        <Stack spacing={2}>
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
            </Stack>
        </Box>
    )
}

export default SettingsEmail;