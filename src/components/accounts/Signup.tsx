import { Stack, TextField, Button } from "@mui/material";
import { createUserWithEmailAndPassword, deleteUser, getIdToken } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

interface User {
    id: string;
    displayName: string;
    username: string;
};

const Signup = () => {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isSignup, setSignup] = useState(false);

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
                    fetch('http://localhost:8080/api/user', {
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
                const errorCode = error.code;
                const errorMessage = error.message;
                setSignup(false);
            })
        }
        else{
            console.log("not signed up")
        }
    }, [isSignup])

    return(
        <Stack alignItems="center" justifyContent="center" spacing={3} sx={{ height: "100%" }}>
            <TextField id="name-input" label="Name" onChange={ (e) => {setNameInput(e.target.value)} } />
            <TextField id="email-input" label="Email" onChange={ (e) => {setEmailInput(e.target.value)} } />
            <TextField id="username-input" label="Username" onChange={ (e) => {setUsernameInput(e.target.value)} } />
            <TextField id="password-input" label="Password" type="password" onChange={ (e) => {setPasswordInput(e.target.value)} } />
            <Button onClick={() => {setSignup(true)}} variant="contained">Sign Up</Button>
        </Stack>
    )
}

export default Signup;