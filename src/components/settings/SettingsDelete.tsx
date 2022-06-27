import { Box, Stack, IconButton, TextField, Divider, Button, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { PageLabel } from "../page";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";

const SettingsDelete = () => {
    const [passwordInput, setPasswordInput] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleDeleteAccount = () => {
        let credential = EmailAuthProvider.credential(auth!.currentUser!.email!, passwordInput);
        let user = auth.currentUser;

        reauthenticateWithCredential(user!, credential)
        .then(() => {
            deleteUser(user!)
            .then(() => {
                navigate('/');
            })
        })
    }

    return(
        <Box>
            <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%' }}>
                <IconButton onClick={ () => { location.state ? navigate('..', {state: { reaunthenticated: true }}) : navigate('/settings') } }>
                    <ArrowBackIcon />
                </IconButton>
                <PageLabel>Delete Account</PageLabel>
            </Stack>
            <Stack spacing={2}>
                <Typography variant="h6">
                    Confirm your password
                </Typography>
                <Divider />
                <TextField id="password-input" label="Password" type="password" value={passwordInput} onChange={(e) => {setPasswordInput(e.target.value)}} />
                <Stack spacing={2} direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent="space-between">
                    <Alert severity="warning">This action will permanently delete your account</Alert>
                    <Button variant="contained" sx={{ backgroundColor: 'red' }} onClick={handleDeleteAccount}>Delete</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default SettingsDelete;