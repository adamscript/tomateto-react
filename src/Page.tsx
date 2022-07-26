import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Box, createTheme, CssBaseline, Paper, styled, ThemeProvider, useMediaQuery } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Accounts, App } from './routes';
import { auth } from './firebase';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { deleteCurrentUser, setCurrentUser } from './features/user/currentUserSlice';
import { setAuthState } from './features/user/authStateSlice';
import { PageLoading, PageSnackbar } from './components/page';
import { setDarkMode, setLightMode } from './features/app/darkModeSlice';
import { User } from 'firebase/auth';
import insertErrorLog from './features/utility/errorLogging';

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  },

  components: {
    MuiAvatar : {
      styleOverrides: {
        root: {
          width: 48,
          height: 48
        }
      }
    },

    MuiButton : {
      styleOverrides: {
        root: {
            textTransform: 'none',
            fontFamily: 'Roboto',
            fontSize: 14,
            fontWeight: 700,
            borderRadius: 30,
            minWidth: 80,
            height: 35
        }
      }
    },

    MuiCardMedia : {
      styleOverrides: {
        root: {
          borderRadius: 15,
          '&:hover': {
            borderRadius: 15
          }
        }
      }
    },

    MuiCircularProgress : {
      defaultProps: {
        size: 32,
        thickness: 5
      },
      styleOverrides: {
        root: {
          margin: '24px'
        }
      }
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar': {
            width: '12px',
            background: 'rgba(0, 0, 0, 0)',
          },
           
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#7D7D7D',
            border: '3px solid #FFFFFF',
            borderRadius: '6px',
          },
        }
      }
    },

    MuiDrawer : {
      styleOverrides: {
        root: {
          '& .MuiDrawer-paper': {
            borderRadius: '30px 30px 0 0'
          }
        }
      }
    },

    MuiUseMediaQuery : {
      defaultProps: {
        noSsr: true
      }
    }
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },

  components: {
    MuiAvatar : {
      styleOverrides: {
        root: {
          width: 48,
          height: 48,

          '& .MuiAvatar-fallback': {
            color: 'white'
          }
        }
      }
    },

    MuiButton : {
      styleOverrides: {
        root: {
            textTransform: 'none',
            fontFamily: 'Roboto',
            fontSize: 14,
            fontWeight: 700,
            borderRadius: 30,
            minWidth: 80,
            height: 35
        }
      }
    },

    MuiCard : {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent'
        }
      }
    },

    MuiCardMedia : {
      styleOverrides: {
        root: {
          borderRadius: 15
        }
      }
    },

    MuiCircularProgress : {
      defaultProps: {
        size: 32,
        thickness: 5
      },
      styleOverrides: {
        root: {
          margin: '24px'
        }
      }
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar': {
            width: '12px',
            background: 'rgba(0, 0, 0, 0)',
          },
           
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#7D7D7D',
            border: '3px solid #121212',
            borderRadius: '6px',
          }
        }
      }
    },

    MuiDrawer : {
      styleOverrides: {
        root: {
          '& .MuiDrawer-paper': {
            borderRadius: '30px 30px 0 0'
          }
        }
      }
    },

    MuiDialog : {
      styleOverrides: {
        root: {
          '& .MuiDialog-paper': {
            backgroundColor: '#000'
          }
        }
      }
    },

    MuiUseMediaQuery : {
      defaultProps: {
        noSsr: true
      }
    }
  }
})

const Foreground = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary
})) as typeof Box;

const Background = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: -1
})) as typeof Box;

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let retries = 3;

function Page() {
  const [isLoaded, setLoaded] = useState(false);
  const [spinner, setSpinner] = useState(false);
  
  const [loadMessage, setLoadMessage] = useState('');

  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.darkMode.value);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {noSsr: true});
  const storedTheme = JSON.parse(localStorage.getItem('currentTheme') || '{}');

  console.log("loaded " + isLoaded)

  useEffect(() => {
    localStorage.setItem('currentTheme', JSON.stringify(darkMode ? 'dark' : 'light'));
  }, [darkMode])

  useEffect(() => {
    if(storedTheme.length){
      if(storedTheme == 'dark'){
        dispatch(setDarkMode());
      }
      else if(storedTheme == 'light'){
        dispatch(setLightMode());
      }
    }
    else{
      dispatch(prefersDarkMode ? setDarkMode() : setLightMode());
    }

    auth.onAuthStateChanged((user) => {
      setLoaded(false);
      
      const spinnerTimeout = setTimeout(() => { setSpinner(true) }, 6000);
      const messageTimeout = setTimeout(() => { setSpinner(false); setLoadMessage("Sorry this is taking a bit longer than expected. You can wait a little longer or come back later.") }, 12000);

      function clearTimeouts(){
        clearTimeout(spinnerTimeout);
        clearTimeout(messageTimeout);
      }
      
      function fetchCurrentUser(user: User){
    
        fetch(`${process.env.REACT_APP_API_URL}/api/user/${user.uid}`, { mode: 'cors' })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            dispatch(setCurrentUser(res.items));
            dispatch(setAuthState(true));
            clearTimeouts();
            setLoaded(true);
        })
        .catch((err) => {
          clearTimeouts();
          
          setTimeout(() => { 
            if(retries === 2){
              setSpinner(true);
              retries -= 1;
              fetchCurrentUser(user);
            }
            else if(retries){
              retries -= 1;
              fetchCurrentUser(user);
            }
            else{
              setSpinner(false);
              setLoadMessage('Oops, something went wrong. Please try again later.');
              insertErrorLog("Fetching current user on Page", err);
            }
          }, 4000);
          
        })
      }

      if(user){
        console.log("logged in");
        fetchCurrentUser(user);
      }
      else{
        setTimeout(() => {
          console.log("logged out")
          dispatch(setAuthState(false));
          dispatch(deleteCurrentUser());
          setLoaded(true);
          clearTimeouts();
        }, 1)
      }
    });
  }, [])
    
  return (
    <ThemeProvider theme={ darkMode ? darkTheme : lightTheme }>
      <CssBaseline />
      <PageSnackbar />
      <Foreground>
        <Routes>
          <Route path="/*" element={isLoaded ? <App /> : <PageLoading message={loadMessage} spinner={spinner} />} />
          <Route path="accounts/*" element={isLoaded ? <Accounts /> : <PageLoading message={loadMessage} spinner={spinner} />} />
          <Route path="*" element={isLoaded ? <Navigate to="/404" replace /> : <PageLoading message={loadMessage} spinner={spinner} />} />
        </Routes>
      </Foreground>
      <Background />
    </ThemeProvider>
  );
}

export default Page;
