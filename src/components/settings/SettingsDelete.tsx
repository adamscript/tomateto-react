import { Box, Stack, IconButton, TextField, Divider, Button, Typography, Alert, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { PageLabel } from "../page";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import { firebaseErrorHandling } from "../../features/utility";
import { openSnackbarError, openSnackbarWarning } from "../../features/app/snackbarSlice";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import insertErrorLog from "../../features/utility/errorLogging";

const StyledForm = styled('form')(() => ({
    width: '100%',
    height: '100%'
}))

const SettingsDelete = () => {
    const [passwordInput, setPasswordInput] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = "Delete Account - Tomateto";
    }, [])

    const handleDeleteAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        function fetchDeleteUser(res: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/user/delete`, {
                mode: 'cors',
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',
                            'Authorization': `Bearer ${res}`}
            })
            .then((res) => {
                deleteAccount();
            })
            .catch((err) => {
                setLoading(false);
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."))
                insertErrorLog("Fetch Delete User / fetchDeleteUser / handleDeleteAccount / SettingsDelete", err);
            })
        }
        
        function deleteAccount(){
            if(auth.currentUser){
                let credential = auth.currentUser.email ? EmailAuthProvider.credential(auth.currentUser.email, passwordInput) : null;
                let user = auth.currentUser;
        
                if(credential){
                    reauthenticateWithCredential(user, credential)
                    .then(() => {
                        deleteUser(user!)
                        .then(() => {
                            navigate('/');
                            dispatch(openSnackbarWarning('Account deleted successfully. Goodbye :('))
                        })
                        .catch((err) => {
                            dispatch(openSnackbarError(firebaseErrorHandling(err)));
                            insertErrorLog("Deleting account on firebase / deleteAccount / handleDeleteAccount / SettingsDelete", err);
                        })
                    })
                    .catch((err) => {
                        setErrorText(firebaseErrorHandling(err));
                        insertErrorLog("Reaunthenticating with credential / deleteAccount / handleDeleteAccount / SettingsDelete", err);
                    })
                }
                else{
                    insertErrorLog("Getting credential / deleteAccount / handleDeleteAccount / SettingsDelete");
                }
            }
            else{
                insertErrorLog("Getting auth current User / deleteAccount / handleDeleteAccount / SettingsDelete");
            }
        }

        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchDeleteUser(res);
        })
        .catch((err) => {
            dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
            insertErrorLog("Get id token / handleDeleteAccount / SettingsDelete", err);
        })
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
                    <TextField disabled={isLoading} id="password-input" label="Password" type="password" value={passwordInput} onChange={(e) => {setPasswordInput(e.target.value)}} error={errorText ? true : false} helperText={errorText} />
                    <Stack spacing={2} direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent="space-between">
                        <Alert severity="warning">This action will permanently delete your account</Alert>
                        <LoadingButton loading={isLoading} variant="contained" color="error" type="submit">Delete</LoadingButton>
                    </Stack>
                </Stack>
            </StyledForm>
        </Box>
    )
}

export default SettingsDelete;