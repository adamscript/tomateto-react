import '../App.css';
import { PageAppBar, PageBottomNavigation, PageFabNewPost, PageLinkModal, PageNotFound, PagePhotoModal, PageSearchInput, PageSideNavigation, PageSnackbar } from '../components/page';
import { Box, Divider, Paper, Slide, Stack, useMediaQuery, useScrollTrigger } from '@mui/material';
import { Container } from '@mui/system';
import { styled, useTheme } from '@mui/material/styles';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Explore, Home, Post, Search, Settings, User } from '.';
import { useAppSelector } from '../app/hooks';
import { SettingsAccount, SettingsPassword, SettingsProfile, SettingsProfileModal } from '../components/settings';
import SettingsDelete from '../components/settings/SettingsDelete';
import SettingsEmail from '../components/settings/SettingsEmail';
import { ModalNewPost } from '../components/post';

const AppContainer = styled(Container)(({theme}) => ({
  maxWidth: 600,

  [theme.breakpoints.up('sm')]: {
    maxWidth: 900
  },

})) as typeof Container;

const SideNavigationContainer = styled(Box)(({theme}) => ({
  minWidth: 120,

  [theme.breakpoints.up('md')]: {
      width: 300
  },

  [theme.breakpoints.down('sm')]: {
      display: 'none'
  }

})) as typeof Box;

const BottomNavigationContainer = styled(Paper)(({theme}) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 2,

  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }

})) as typeof Paper;

const Offset = styled('div')(({theme}) => theme.mixins.toolbar);

function App() {
  const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);
  
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ backgroundColor: 'transparent' }}>
      <Stack>
        {
          !smUp && location.pathname != '/' ?
          <></>
          :
          <><PageAppBar></PageAppBar>
          <Offset /></>
        }
        {
          (!smUp && location.pathname == '/explore') || (!smUp && location.pathname == '/search') ?
            <><PageSearchInput />
            <Offset /></>
          :
          <></>
        }
        <Box>
          <AppContainer disableGutters>
            <Stack direction="row">
              <SideNavigationContainer>
                <PageSideNavigation />
              </SideNavigationContainer>
              <Box sx={{ width: 1, maxWidth: 600 }}>
                <Routes location={state?.backgroundLocation || location}>
                  <Route index element={isLoggedIn ? <Home /> : <Navigate to="/explore" replace />} />
                  <Route path="home" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/explore" replace />} />
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
                  <Route path="settings/">
                    <Route index element={isLoggedIn ? <Settings /> : <Navigate to="/explore" replace />} />
                    <Route path="profile" element={isLoggedIn ? <SettingsProfile /> : <Navigate to="/explore" replace />} /> 
                    <Route path="account/">
                      <Route index element={isLoggedIn ? <SettingsAccount /> : <Navigate to="/explore" replace />} />
                      <Route path="email" element={isLoggedIn ? <SettingsEmail /> : <Navigate to="/explore" replace />} /> 
                      <Route path="password" element={isLoggedIn ? <SettingsPassword /> : <Navigate to="/explore" replace />} />
                      <Route path="delete" element={isLoggedIn ? <SettingsDelete /> : <Navigate to="/explore" replace />} />
                    </Route>
                  </Route>
                  <Route path="compose/post" element={<Navigate to="/" replace />} />
                  <Route path="404" element={<PageNotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
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
                    <Route path="compose/post" element={<ModalNewPost />} />
                    {
                      state?.backgroundLocation &&
                      <Route path="settings/" element={<Outlet />}>
                        <Route path="profile" element={<SettingsProfileModal />} />
                      </Route>
                    }
                  </Routes>
                }
              </Box>
            </Stack>
          </AppContainer>
        </Box>
        { isLoggedIn && <PageFabNewPost /> }
        <Offset />
        {
          !location.pathname.includes('/post/') &&
          <BottomNavigationContainer elevation={3}>
            <PageBottomNavigation />
          </BottomNavigationContainer>
        }
      </Stack>
    </Box>
  );
}

export default App;
