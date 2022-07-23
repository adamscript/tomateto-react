import { useEffect, useState } from 'react';
import './App.css';
import { Box, createTheme, CssBaseline, Paper, styled, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Accounts, App } from './routes';
import { auth } from './firebase';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { deleteCurrentUser, setCurrentUser } from './features/user/currentUserSlice';
import { setAuthState } from './features/user/authStateSlice';
import { PageLoading, PageSnackbar } from './components/page';

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
            borderRadius: '30px 30px 0 0',
            minHeight: 150
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
          },
        }
      }
    },

    MuiDrawer : {
      styleOverrides: {
        root: {
          '& .MuiDrawer-paper': {
            borderRadius: '30px 30px 0 0',
            minHeight: 150
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
          fetch(`${process.env.REACT_APP_API_URL}/api/user/${user.uid}`, { mode: 'cors' })
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
      <CssBaseline />
      <PageSnackbar />
      <Foreground>
        <Routes>
          <Route path="/*" element={isLoaded ? <App /> : <PageLoading />} />
          <Route path="accounts/*" element={isLoaded ? <Accounts /> : <PageLoading />} />
          <Route path="*" element={isLoaded ? <Navigate to="/404" replace /> : <PageLoading />} />
        </Routes>
      </Foreground>
      <Background />
    </ThemeProvider>
  );
}

export default Page;
