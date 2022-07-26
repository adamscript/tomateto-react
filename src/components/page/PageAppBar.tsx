import { AppBar, Box, Stack, SvgIcon, IconButton, Button, useMediaQuery } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { Container } from '@mui/system';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ReactComponent as TomatetoLightLogo } from "../../logos/tomatetolight-logo.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import PageAccountMenu from "./PageAccountMenu";
import PageSearchInput from "./PageSearchInput";
import PageInfoMenu from "./PageInfoMenu";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    height: '64px',
    backgroundColor: theme.palette.background.default,
    justifyContent: 'center'
}));

const IconButtonWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
}))

const PageAppBar = () => {
    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);

    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleNewPost = () => {
        navigate('/compose/post', { state: {
          backgroundLocation: location
        } });
    }

    return(
        <Box>
          <StyledAppBar elevation={ smUp ? 1 : 0 }>
              <Container maxWidth="md">
                  <Stack direction="row" alignItems="center" justifyContent={ "space-between" }>
                      { !smUp && location.pathname != '/' ? <></> : <SvgIcon onClick={() => {navigate('/')}} sx={{ width: '160px', height: '60px', cursor: 'pointer' }} component={TomatetoLightLogo} inheritViewBox /> }
                      {
                        smUp &&
                        <>
                        <PageSearchInput />
                            {
                          isLoggedIn ?
                            <>
                            <IconButtonWrapper>
                                <IconButton onClick={handleNewPost}><AddBoxOutlinedIcon /></IconButton>
                                <PageAccountMenu />
                            </IconButtonWrapper></>
                            :
                            <Stack direction="row" spacing={1} alignItems="center">
                                <PageInfoMenu />
                                <Button onClick={() => { navigate("/accounts/login")}} sx={{ width: 120 }} variant="outlined">Log in</Button>
                            </Stack>
                        }</>
                      }
                  </ Stack>
              </Container>
          </StyledAppBar>
        </Box>
    );
}

export default PageAppBar;