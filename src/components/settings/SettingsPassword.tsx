import { Box } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack, IconButton, TextField, Divider, Button, Alert, LinearProgress, styled } from "@mui/material";
import { PageLabel } from "../page";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "../../firebase";
import { firebaseErrorHandling } from "../../features/utility";

const StyledForm = styled('form')(() => ({
    width: '100%',
    height: '100%'
}))

const SettingsPassword = () => {
    const [oldPasswordInput, setOldPasswordInput] = useState('');
    const [newPasswordInput, setNewPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [errorAlertMessage, setErrorAlertMessage] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = "Change Password - Tomateto";
    }, [])

    const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);

        e.preventDefault();

        if(auth.currentUser){
            let credential = auth.currentUser.email ? EmailAuthProvider.credential(auth.currentUser.email, oldPasswordInput) : null;
            let user = auth.currentUser;
    
            if(credential){
                reauthenticateWithCredential(user, credential)
                .then(() => {
                    updatePassword(user!, newPasswordInput)
                    .then(() => {
                        setLoading(false);
        
                        setOldPasswordInput('');
                        setNewPasswordInput('');
                        setConfirmPasswordInput('');
                        setErrorText('');
                        setErrorAlertMessage('');
                    })
                    .catch((err) => {
                        setLoading(false);
        
                        setErrorAlertMessage(firebaseErrorHandling(err));
                        setErrorText('');
                    })
                })
                .catch((err) => {
                    setLoading(false);
        
                    if(err.code == 'auth/wrong-password'){
                        setErrorText(firebaseErrorHandling(err));
                        setErrorAlertMessage('');
                    }
                    else{
                        setErrorAlertMessage(firebaseErrorHandling(err));
                        setErrorText('');
                    }
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
        <Box padding="0 16px">
            <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%' }}>
                <IconButton size="small" onClick={ () => { location.state ? navigate('..', { state: { reaunthenticated: true }}) : navigate('/settings') } }>
                    <ArrowBackIcon />
                </IconButton>
                <PageLabel>Change Password</PageLabel>
            </Stack>
            <StyledForm onSubmit={handleChangePassword}>
                <Stack spacing={2}>
                    { isLoading && <LinearProgress /> }
                    <TextField id="oldpassword-input" label="Old password" value={oldPasswordInput} type="password" onChange={ (e) => {setOldPasswordInput(e.target.value)} } error={errorText ? true : false} helperText={errorText} />
                    <Divider />
                    <TextField id="newpassword-input" label="New password" value={newPasswordInput} type="password" onChange={ (e) => {setNewPasswordInput(e.target.value)} } />
                    <TextField id="confirmpassword-input" label="Confirm new password" value={confirmPasswordInput} type="password" onChange={ (e) => {setConfirmPasswordInput(e.target.value)} } />
                    <Divider />
                    <Stack direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent={ confirmPasswordInput ? "space-between" : "end" }>
                        { !errorAlertMessage && confirmPasswordInput && <Alert severity={ newPasswordInput != confirmPasswordInput ? "warning" : "success" }>{ newPasswordInput != confirmPasswordInput ? "Password does not match" : "Password matched" }</Alert> }
                        { errorAlertMessage && <Alert severity="error">{errorAlertMessage}</Alert> }
                        <Button variant="contained" type="submit" disabled={ !oldPasswordInput || !newPasswordInput || newPasswordInput != confirmPasswordInput ? true : false }>Update password</Button>
                    </Stack>
                </Stack>
            </StyledForm>
        </Box>
    )
}

export default SettingsPassword;