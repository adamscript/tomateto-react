import { Alert, Button, CircularProgress, Divider, IconButton, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PageLabel } from "../page";
import { useLocation, useNavigate } from "react-router-dom";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from "firebase/auth";
import { firebaseErrorHandling } from "../../features/utility";

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

    const handleConfirm = () => {
        setLoading(true);
        
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

    const handleChangeEmail = () => {
        setLoading(true)

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
        <Stack spacing={2}>
            <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%' }}>
                <IconButton onClick={ () => { location.state ? navigate('..', { state: { reaunthenticated: true }}) : navigate('/settings') } }>
                    <ArrowBackIcon />
                </IconButton>
                <PageLabel>Change Email</PageLabel>
            </Stack>
            { isLoading && <LinearProgress /> }
            {
                isReauthenticated ?
                <Stack spacing={2}>
                    <TextField disabled id="currentemail" label="Current email" value={currentEmailInput} />
                    <TextField id="newemail-input" label="New email" value={newEmailInput} onChange={(e) => {setNewEmailInput(e.target.value)}} disabled={isLoading} />
                    <Divider />
                    <Stack direction="row" sx={{ width: '100%' }} justifyContent={ errorAlertMessage ? "space-between" : "end" }>
                        { errorAlertMessage && <Alert severity="error">{errorAlertMessage}</Alert> }
                        <Button variant="contained" onClick={handleChangeEmail} disabled={isLoading}>Save</Button>
                    </Stack>
                </Stack>
                :
                <Stack spacing={2}>
                        <Typography variant="h6">
                            Confirm your password
                        </Typography>
                        <Divider />
                        <TextField id="password-input" label="Password" type="password" value={passwordInput} onChange={(e) => {setPasswordInput(e.target.value)}} error={errorText ? true : false} helperText={errorText} disabled={isLoading} />
                        <Stack spacing={2} direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent="end">
                            <Button variant="contained" onClick={handleConfirm} disabled={isLoading}>Confirm</Button>
                        </Stack>
                </Stack>
            }
        </Stack>
    )
}

export default SettingsEmail;