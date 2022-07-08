import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { firebaseErrorHandling } from "../../features/utility";

const Login = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isLogin, setLogin] = useState(false);
    const [errorText, setErrorText] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("login effect called")

        if(isLogin){
            signInWithEmailAndPassword(auth, emailInput, passwordInput)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate('/');
            })
            .catch((err) => {
                setErrorText(firebaseErrorHandling(err));
                setLogin(false);
            }) 
        }
        else{
            console.log("not logged in");
        }
    }, [isLogin]);

    return(
        <Stack alignItems="center" justifyContent="center" spacing={3} sx={{ height: "100%" }}>
            { errorText && <Alert severity="error">{errorText}</Alert> }
            { location.state && !errorText && <Alert severity="info">Log in to continue</Alert> }
            <TextField id="email-input" label="Email" onChange={ (e) => {setEmailInput(e.target.value)} } />
            <TextField id="password-input" label="Password" type="password" onChange={ (e) => {setPasswordInput(e.target.value)} } />
            <Link to="/accounts/password-reset">Forgot password?</Link>
            <Button onClick={() => {setLogin(true)}} variant="contained">Log in</Button>
            <Typography>Don't have an account? <Link to="/accounts/signup">Sign up</Link></Typography>
        </Stack>
    )
}

export default Login;