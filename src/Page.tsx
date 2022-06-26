import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PageAppBar, PageSideButton } from './components/page';
import { Box, Divider, Grid, Stack } from '@mui/material';
import { Container } from '@mui/system';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { Accounts, App, Explore, Home, Post, User } from './routes';
import { auth } from './firebase';
import { useAppDispatch } from './app/hooks';
import { deleteCurrentUser, setCurrentUser } from './features/user/currentUserSlice';
import { setAuthState } from './features/user/authStateSlice';

function Page() {
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useAppDispatch();

  console.log("loaded " + isLoaded)
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        setLoaded(false);

        if(user){
          console.log("logged in");
          fetch(`http://localhost:8080/api/user/${user.uid}`, { mode: 'cors' })
          .then((res) => {
              return res.json();
          })
          .then((res) => {
              dispatch(setCurrentUser(res.items));
              dispatch(setAuthState(true));
              setLoaded(true);
          })
        }
        else{
          setTimeout(() => {
            console.log("logged out")
            dispatch(setAuthState(false));
            dispatch(deleteCurrentUser());
            setLoaded(true);
          }, 1)
        }
      });
  }, [])
    
  return (
      <Routes>
        <Route path="/*" element={isLoaded ? <App /> : <div>Loading...</div>} />
        <Route path="accounts/*" element={isLoaded ? <Accounts /> : <div>Loading...</div>} />
      </Routes>
  );
}

export default Page;
