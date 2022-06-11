import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PageAppBar, PageSideButton } from './components/page';
import { Box, Divider, Grid, Stack } from '@mui/material';
import { Container } from '@mui/system';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { Accounts, App, Explore, Home, Post, User } from './routes';
import { auth } from './firebase';

function Page() {
  const [user, setUser] = useState(Object);
  const [isLoggedIn, setLoggedIn] = useState(Boolean);
  const [isLoaded, setLoaded] = useState(false);

  console.log("loaded " + isLoaded)
  console.log("page init " + isLoggedIn)
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if(user){
          setUser(user);
          setLoggedIn(true);
          setLoaded(true);
          console.log("logged in" + isLoggedIn)
        }
        else{
          setUser(user);
          setLoggedIn(false);
          setLoaded(true);
          console.log("logged out" + isLoggedIn)
        }
      });
  })
    
  return (
      <Routes>
        <Route path="/*" element={isLoaded ? <App currentUser={user} isLoggedIn={isLoggedIn} /> : <div>Loading...</div>} />
        <Route path="accounts/*" element={isLoaded ? <Accounts isLoggedIn={isLoggedIn} /> : <div>Loading...</div>} />
      </Routes>
  );
}

export default Page;
