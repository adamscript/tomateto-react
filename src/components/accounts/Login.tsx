import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

const Login = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isLogin, setLogin] = useState(false);

    const navigate = useNavigate();

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
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLogin(false);
                console.log(errorCode + errorMessage);
            }) 
        }
        else{
            console.log("not logged in");
        }
    }, [isLogin]);

    return(
        <Stack alignItems="center" justifyContent="center" spacing={3} sx={{ height: "100%" }}>
            <TextField id="email-input" label="Email" onChange={ (e) => {setEmailInput(e.target.value)} } />
            <TextField id="password-input" label="Password" type="password" onChange={ (e) => {setPasswordInput(e.target.value)} } />
            <Link to="/accounts/password-reset">Forgot password?</Link>
            <Button onClick={() => {setLogin(true)}} variant="contained">Log in</Button>
            <Typography>Don't have an account? <Link to="/accounts/signup">Sign up</Link></Typography>
        </Stack>
    )
}

export default Login;