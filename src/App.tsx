import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PageAppBar, PageSideButton } from './components/page';
import { Box, Grid, Stack } from '@mui/material';
import { Container } from '@mui/system';
import { Link, Route, Routes } from 'react-router-dom';
import { Explore, Home } from './routes';

function App() {
  return (
    <Box>
      <PageAppBar></PageAppBar>
      <Box sx={{ position:'relative', top:'60px' }}>
      <Link to="/">Home</Link>
      <Link to="/explore">Explore</Link>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={4}>
              <PageSideButton />
            </Grid>
            <Grid item xs={8}>
              <Stack sx={{ width: "600px" }}>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
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
