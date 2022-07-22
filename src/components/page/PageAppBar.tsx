import { AppBar, Box, Typography, InputBase, Stack, SvgIcon, IconButton, Button, Menu, MenuItem, Popper, Popover, Grow, ClickAwayListener, MenuList, Paper, useMediaQuery } from "@mui/material";
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Container, shadows } from '@mui/system';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ReactComponent as TomatetoLightLogo } from "../../logos/tomatetolight-logo.svg";

import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalNewPost } from "../post";
import { useAppSelector } from "../../app/hooks";
import PageAccountMenu from "./PageAccountMenu";
import PageSearchInput from "./PageSearchInput";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    height: '60px',
    backgroundColor: theme.palette.background.default,
    justifyContent: 'center'
}));

const Logo = styled(Typography)(() => ({
    fontFamily: 'Titillium Web',
    fontSize: '36px',
    color: '#FF3333',
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
                      { !smUp && location.pathname != '/' ? <></> : <SvgIcon sx={{ width: '160px', height: '60px' }} component={TomatetoLightLogo} inheritViewBox /> }
                      {
                        smUp &&
                        <>{
                          isLoggedIn ?
                            <><PageSearchInput />
                            <IconButtonWrapper>
                                <IconButton onClick={handleNewPost}><AddBoxOutlinedIcon /></IconButton>
                                <PageAccountMenu />
                            </IconButtonWrapper></>
                            : 
                            <Button onClick={() => { navigate("/accounts/login")}} sx={{ width: 120 }} variant="outlined">Log in</Button>
                        }</>
                      }
                  </ Stack>
              </Container>
          </StyledAppBar>
        </Box>
    );
}

export default PageAppBar;