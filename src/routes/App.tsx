import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import { PageAppBar, PageSideButton } from '../components/page';
import { Box, Divider, Grid, Stack } from '@mui/material';
import { Container } from '@mui/system';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Explore, Home, Post, User } from '.';
import { auth } from '../firebase';

function App(props: any) {
  const [response, setResponse] = useState(Object);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if(props.isLoggedIn){
      fetch(`http://localhost:8080/api/user/${props.currentUser.uid}`, { mode: 'cors' })
      .then((res) => {
          return res.json();
      })
      .then((res) => {
          setResponse(res.items);
          setLoaded(true);
      })
    }
    else{
      setLoaded(true);
    }
}, [])

  return (
    <Box>
      <PageAppBar isLoggedIn={props.isLoggedIn}></PageAppBar>
      <Box sx={{ position:'relative', top:'60px' }}>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={4}>
              {isLoaded ? <PageSideButton response={response} isLoggedIn={props.isLoggedIn} /> : <div>loading...</div>}
            </Grid>
            <Grid item xs={8}>
              <Stack sx={{ width: "600px" }}>
                <Routes>
                  <Route index element={props.isLoggedIn ? <Home /> : <Navigate to="/explore" replace />} />
                  <Route path="home" element={props.isLoggedIn ? <Home /> : <Navigate to="/explore" replace />} />
                  <Route path="explore" element={<Explore />} />
                  <Route path=":username">
                    <Route index element={<User />} />
                    <Route path="post/:postId" element={<Post />} />
                  </Route>
                </Routes>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
