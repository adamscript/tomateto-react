import { Alert, Box, Button, Paper, Stack, styled, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { firebaseErrorHandling } from "../../features/utility";
import { LoadingButton } from "@mui/lab";
import insertErrorLog from "../../features/utility/errorLogging";

const StyledForm = styled('form')(() => ({
    width: '100%',
    height: '100%'
}))

const LinkTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
})) as typeof Typography;

const Login = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isLogin, setLogin] = useState(false);
    const [errorText, setErrorText] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = "Log in - Tomateto";
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        setLogin(true);
        
        e.preventDefault();

        signInWithEmailAndPassword(auth, emailInput, passwordInput)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate('/');
            })
            .catch((err) => {
                setErrorText(firebaseErrorHandling(err));
                setLogin(false);

                insertErrorLog("Sign in with email and password / handleLogin / Login", err);
            })
    }

    return(
        <StyledForm onSubmit={handleLogin}>
            <Stack width="100%" height="100%" justifyContent="space-between">
                <Stack width="100%" spacing={3}>
                    { errorText && <Alert severity="error">{errorText}</Alert> }
                    { location.state && !errorText && <Alert severity="info">Log in to continue</Alert> }
                    <TextField id="email-input" label="Email" type="text" onChange={ (e) => {setEmailInput(e.target.value)} } />
                    <Stack width="100%" spacing={1}>
                        <TextField id="password-input" label="Password" type="password" onChange={ (e) => {setPasswordInput(e.target.value)} } />
                        <LinkTypography component={Link} to="/accounts/recover" sx={{ fontSize: '14px' }}>Forgot password?</LinkTypography>
                    </Stack>
                </Stack>
                <Stack width="100%" spacing={3}>
                    <LoadingButton loading={isLogin} sx={{ width: '100%', height: '45px' }} type="submit" variant="contained">Log in</LoadingButton>
                    <Stack direction="row" spacing={1}>
                        <Typography>Don't have an account?</Typography>
                        <LinkTypography component={Link} to="/accounts/signup">Sign up</LinkTypography>
                    </Stack>
                </Stack>
            </Stack>
        </StyledForm>
    )
}

export default Login;