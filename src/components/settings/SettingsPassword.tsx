import { Box } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack, IconButton, TextField, Divider, Button, Alert, LinearProgress } from "@mui/material";
import { PageLabel } from "../page";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "../../firebase";

const SettingsPassword = () => {
    const [oldPasswordInput, setOldPasswordInput] = useState('');
    const [newPasswordInput, setNewPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

    const [isLoading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleChangePassword = () => {
        setLoading(true);

        let credential = EmailAuthProvider.credential(auth!.currentUser!.email!, oldPasswordInput);
        let user = auth.currentUser;

        reauthenticateWithCredential(user!, credential)
        .then(() => {
            updatePassword(user!, newPasswordInput)
            .then(() => {
                setLoading(false);

                setOldPasswordInput('');
                setNewPasswordInput('');
                setConfirmPasswordInput('');
            })
        })
    }

    return(
        <Box>
            <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%' }}>
                <IconButton onClick={ () => { location.state ? navigate('..', { state: { reaunthenticated: true }}) : navigate('/settings') } }>
                    <ArrowBackIcon />
                </IconButton>
                <PageLabel>Change Password</PageLabel>
            </Stack>
            <Stack spacing={2}>
                { isLoading && <LinearProgress /> }
                <TextField id="oldpassword-input" label="Old password" value={oldPasswordInput} type="password" onChange={ (e) => {setOldPasswordInput(e.target.value)} } />
                <Divider />
                <TextField id="newpassword-input" label="New password" value={newPasswordInput} type="password" onChange={ (e) => {setNewPasswordInput(e.target.value)} } />
                <TextField id="confirmpassword-input" label="Confirm new password" value={confirmPasswordInput} type="password" onChange={ (e) => {setConfirmPasswordInput(e.target.value)} } />
                <Divider />
                <Stack direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent={ confirmPasswordInput ? "space-between" : "end" }>
                    { confirmPasswordInput && <Alert severity={ newPasswordInput != confirmPasswordInput ? "warning" : "success" }>{ newPasswordInput != confirmPasswordInput ? "Password does not match" : "Password matched" }</Alert> }
                    <Button variant="contained" onClick={handleChangePassword} disabled={ !newPasswordInput || newPasswordInput != confirmPasswordInput ? true : false }>Save</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default SettingsPassword;