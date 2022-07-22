import { Stack, Alert, TextField, Button, Typography } from "@mui/material"
import { confirmPasswordReset, sendPasswordResetEmail, verifyPasswordResetCode } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { firebaseErrorHandling } from "../../features/utility";
import { useAppDispatch } from "../../app/hooks";
import { openSnackbarInfo } from "../../features/app/snackbarSlice";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "react-router-dom";

const ForgotPassword = () => {
    const [isLoading, setLoading] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [errorText, setErrorText] = useState('');

    const dispatch = useAppDispatch();

    const handleSendLink = () => {
        setLoading(true);

        sendPasswordResetEmail(auth, emailInput)
        .then(() => {
            dispatch(openSnackbarInfo("Recovery link sent"));
            setErrorText('');
            setLoading(false);
        })
        .catch((err) => {
            setErrorText(firebaseErrorHandling(err));
            setLoading(false);
        });
    }

    return(
        <Stack width="100%" height="100%" justifyContent="space-between">
            <Stack width="100%" spacing={3}>
                <Typography>Enter your email address and we'll send you a link to get back into your account.</Typography>
                { errorText && <Alert severity="error">{errorText}</Alert> }
                <TextField id="email-input" label="Email address" onChange={ (e) => {setEmailInput(e.target.value)} } />
            </Stack>
            <LoadingButton loading={isLoading} disabled={ emailInput ? false : true } sx={{ width: '100%', height: '45px' }} onClick={handleSendLink} variant="contained">Send Link</LoadingButton>
        </Stack>
    )
}

const ResetPassword = () => {
    const [isLoading, setLoading] = useState(false);
    const [valid, setValid] = useState(true);

    const [newPasswordInput, setNewPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [errorText, setErrorText] = useState('');

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const actionCode = searchParams.get('oobCode');

    useEffect(() => {
        if(actionCode){
            verifyPasswordResetCode(auth, actionCode)
            .then((res) => {
                setValid(true);
                setErrorText('');
            })
            .catch((err) => {
                setErrorText(firebaseErrorHandling(err));
                setValid(false);
                setLoading(false);
            })
        }
        else{
            setErrorText('Invalid request');
            setValid(false);
            setLoading(false);
        }
    }, [])

    const handleResetPassword = () => {
        setLoading(true);

        if(actionCode){
            confirmPasswordReset(auth, actionCode, newPasswordInput)
            .then((res) => {
                dispatch(openSnackbarInfo("Password saved"));
                setErrorText('');
                setLoading(false);
            })
            .catch((err) => {
                setErrorText(firebaseErrorHandling(err));
                setLoading(false);
            })
        }
    }

    return(
        valid ?
        <Stack width="100%" height="100%" justifyContent="space-between">
            <Stack width="100%" spacing={3}>
                { errorText && <Alert severity="error">{errorText}</Alert> }
                <TextField id="newpassword-input" label="New password" value={newPasswordInput} type="password" onChange={ (e) => {setNewPasswordInput(e.target.value)} } />
                <TextField id="confirmpassword-input" label="Confirm new password" value={confirmPasswordInput} type="password" onChange={ (e) => {setConfirmPasswordInput(e.target.value)} } />
                { confirmPasswordInput && <Alert severity={ newPasswordInput != confirmPasswordInput ? "warning" : "success" }>{ newPasswordInput != confirmPasswordInput ? "Password does not match" : "Password matched" }</Alert> }
            </Stack>
            <LoadingButton loading={isLoading} sx={{ width: '100%', height: '45px' }} onClick={handleResetPassword} variant="contained" disabled={ !newPasswordInput || newPasswordInput != confirmPasswordInput ? true : false }>Save</LoadingButton>
        </Stack> :
        <Alert severity="error">{errorText}</Alert>
    )
}

export { ForgotPassword, ResetPassword };