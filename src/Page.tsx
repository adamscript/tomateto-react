import { useEffect, useState } from 'react';
import './App.css';
import { Box, createTheme, CssBaseline, Paper, styled, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Accounts, App } from './routes';
import { auth } from './firebase';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { deleteCurrentUser, setCurrentUser } from './features/user/currentUserSlice';
import { setAuthState } from './features/user/authStateSlice';

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
            minWidth: 75,
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
            minWidth: 75,
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
          borderRadius: 15,
          '&:hover': {
            borderRadius: 15
          }
        }
      }
    }
  }
})

const Foreground = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary
})) as typeof Box;

const Background = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: -1
})) as typeof Paper;


function Page() {
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useAppDispatch();

  const darkMode = useAppSelector((state) => state.darkMode.value);

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
    <ThemeProvider theme={ darkMode ? darkTheme : lightTheme }>
      <Foreground>
        <Routes>
          <Route path="/*" element={isLoaded ? <App /> : <div>Loading...</div>} />
          <Route path="accounts/*" element={isLoaded ? <Accounts /> : <div>Loading...</div>} />
        </Routes>
      </Foreground>
      <Background />
    </ThemeProvider>
  );
}

export default Page;
