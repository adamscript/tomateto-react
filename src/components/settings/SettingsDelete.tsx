import { Box, Stack, IconButton, TextField, Divider, Button, Typography, Alert, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { PageLabel } from "../page";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import { firebaseErrorHandling } from "../../features/utility";
import { openSnackbarError } from "../../features/app/snackbarSlice";
import { useDispatch } from "react-redux";

const StyledForm = styled('form')(() => ({
    width: '100%',
    height: '100%'
}))

const SettingsDelete = () => {
    const [passwordInput, setPasswordInput] = useState('');
    const [errorText, setErrorText] = useState('');

    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = "Delete Account - Tomateto";
    }, [])

    const handleDeleteAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(auth.currentUser){
            let credential = auth.currentUser.email ? EmailAuthProvider.credential(auth.currentUser.email, passwordInput) : null;
            let user = auth.currentUser;
    
            if(credential){
                reauthenticateWithCredential(user, credential)
                .then(() => {
                    deleteUser(user!)
                    .then(() => {
                        navigate('/');
                    })
                    .catch((err) => {
                        dispatch(openSnackbarError(firebaseErrorHandling(err)));
                    })
                })
                .catch((err) => {
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
        <Box padding="0 16px">
            <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%' }}>
                <IconButton size="small" onClick={ () => { location.state ? navigate('..', {state: { reaunthenticated: true }}) : navigate('/settings') } }>
                    <ArrowBackIcon />
                </IconButton>
                <PageLabel>Delete Account</PageLabel>
            </Stack>
            <StyledForm onSubmit={handleDeleteAccount}>
                <Stack spacing={2}>
                    <Typography variant="h6">
                        Confirm your password
                    </Typography>
                    <Divider />
                    <TextField id="password-input" label="Password" type="password" value={passwordInput} onChange={(e) => {setPasswordInput(e.target.value)}} error={errorText ? true : false} helperText={errorText} />
                    <Stack spacing={2} direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent="space-between">
                        <Alert severity="warning">This action will permanently delete your account</Alert>
                        <Button variant="contained" color="error" type="submit">Delete</Button>
                    </Stack>
                </Stack>
            </StyledForm>
        </Box>
    )
}

export default SettingsDelete;