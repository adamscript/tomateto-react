import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import { PageAppBar, PageLinkModal, PagePhotoModal, PageSideButton } from '../components/page';
import { Box, Dialog, Divider, Grid, Stack } from '@mui/material';
import { Container } from '@mui/system';
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Explore, Home, Post, Search, User } from '.';
import { auth } from '../firebase';
import { useAppSelector } from '../app/hooks';

function App() {
  const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);
  
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <Box>
      <PageAppBar></PageAppBar>
      <Box sx={{ position:'relative', top:'60px' }}>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={4}>
              <PageSideButton />
            </Grid>
            <Grid item xs={8}>
              <Stack sx={{ width: "600px" }}>
                <Routes location={state?.backgroundLocation || location}>
                  <Route index element={isLoggedIn ? <Home /> : <Navigate to="/explore" replace />} />
                  <Route path="home" element={isLoggedIn ? <Home /> : <Navigate to="/explore" replace />} />
                  <Route path="explore" element={<Explore />} />
                  <Route path="search" element={<Search />} />
                  <Route path=":username/">
                    <Route index element={<User />} />
                    <Route path="post/:postId/" element={<Post />}>
                      <Route path="likes" element={<Post />} />
                      <Route path="photo" element={<Post />} />
                    </Route>
                    <Route path="following" element={<User />} />
                    <Route path="followers" element={<User />} />
                  </Route>
                </Routes>
                {
                  <Routes>
                    <Route path=":username/" element={<Outlet />}>
                      <Route path="post/:postId/" element={<Outlet />}>
                        <Route path="likes" element={<PageLinkModal likes />} />
                        <Route path="photo" element={<PagePhotoModal />} />
                      </Route>
                      <Route path="following" element={<PageLinkModal following />} />
                      <Route path="followers" element={<PageLinkModal followers />} />
                    </Route>
                  </Routes>
                }
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
