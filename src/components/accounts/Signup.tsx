import { Stack, TextField, Button, Alert, Typography, styled } from "@mui/material";
import { createUserWithEmailAndPassword, deleteUser, getIdToken } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { firebaseErrorHandling } from "../../features/utility";
import { LoadingButton } from "@mui/lab";

interface User {
    id: string;
    displayName: string;
    username: string;
};

const LinkTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
})) as typeof Typography;

const Signup = () => {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isSignup, setSignup] = useState(false);
    const [errorText, setErrorText] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(isSignup){
            createUserWithEmailAndPassword(auth, emailInput, passwordInput)
            .then((userCredential) => {
                //Signed in
                const user = userCredential.user;

                console.log(user)

                const userBody: User = {
                    id: user.uid,
                    displayName: nameInput,
                    username: usernameInput
                }
                
                getIdToken(user)
                .then(res => {
                    fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`},
                    body: JSON.stringify(userBody)
                    })
                    .then(res => {
                        if(res.ok){
                            console.log(res)
                            navigate('/')
                        }
                        else{
                            deleteUser(user);
                            setSignup(false);
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        setSignup(false);
                    })
                })
                .catch((error) => {
                    deleteUser(user);
                    setSignup(false);
                })
                
            })
            .catch((error) => {
                setErrorText(firebaseErrorHandling(error));
                setSignup(false);
            })
        }
        else{
            console.log("not signed up")
        }
    }, [isSignup])

    return(
        <Stack width="100%" height="100%" justifyContent="space-between">
            <Stack spacing={3} width="100%">
                { errorText && <Alert severity="error">{errorText}</Alert> }
                <TextField id="name-input" label="Name" onChange={ (e) => {setNameInput(e.target.value)} } inputProps={{ maxLength: 60 }} />
                <TextField id="email-input" label="Email" onChange={ (e) => {setEmailInput(e.target.value)} } />
                <TextField id="username-input" label="Username" onChange={ (e) => {setUsernameInput(e.target.value)} } inputProps={{ maxLength: 20 }} />
                <TextField id="password-input" label="Password" type="password" onChange={ (e) => {setPasswordInput(e.target.value)} } />
            </Stack>
            <Stack width="100%" spacing={6}>
                <LoadingButton loading={isSignup} sx={{ width: '100%', height: '45px' }} onClick={() => {setSignup(true)}} variant="contained">Sign Up</LoadingButton>
                <Stack direction="row" spacing={1}>
                    <Typography>Have an account?</Typography>
                    <LinkTypography component={Link} to="/accounts/login">Log in</LinkTypography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Signup;