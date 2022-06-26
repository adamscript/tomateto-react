import { AppBar, Box, Typography, InputBase, Stack, IconButton, Button, Menu, MenuItem, Popper, Popover, Grow, ClickAwayListener, MenuList, Paper } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { Container, shadows } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalNewPost } from "../post";
import { useAppSelector } from "../../app/hooks";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    height: '60px',
    backgroundColor: theme.palette.background.default,
    shadowOpacity: 0.1,
    justifyContent: 'center',
    position: 'fixed',
}));

const Logo = styled(Typography)(() => ({
    fontFamily: 'Titillium Web',
    fontSize: '36px',
    color: '#ff0a0a',
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: alpha(theme.palette.common.black, 0.1),
    marginLeft: 0,
    alignItems: 'center',
    width: '300px',
    height: '42px'
  }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    paddingLeft: 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.disabled,
  }));

const SearchInput = styled(InputBase)(({ theme }) => ({
    paddingLeft: 36,
    height: '100%',
    width: '100%',
    fontSize: '14px',
}));

const IconButtonWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 3,
}))

const SearchMenu = (props: any) => {
    return(
        <Popper
          open={props.open}
          anchorEl={props.anchorEl.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: 'top center'
              }}
            >
              <Paper sx={{ width: '300px' }}>
                <ClickAwayListener onClickAway={props.onClose}>
                  <MenuList
                    id="composition-menu"
                    aria-labelledby="composition-button"
                  >
                    <MenuItem onClick={props.onClick}>Search for "<Typography noWrap>{props.query}</Typography>"</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    )
}

const PageAppBar = () => {
    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);

    const [searchMenuOpen, setSearchMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(String);
    const searchRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e: any) => {
        setSearchQuery(e.target.value);

        if(location.pathname == '/search' || location.pathname == '/explore'){
            navigate(`search?q=${e.target.value}`, {replace: true});
        }
        else{
            setSearchMenuOpen(e.target.value ? true : false);
        }
    }

    const handleSearchSubmit = () => {
        navigate(`search?q=${searchQuery}`);
        setSearchMenuOpen(false);
    }
    
    const handleSearchClose = () => {
        setSearchMenuOpen(false);
    }

    return(
        <Box>
            <StyledAppBar elevation={1}>
                <Container maxWidth="md">
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Logo>tomateto</Logo>
                        <Search ref={searchRef}>
                            <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                            <SearchInput onChange={handleSearch} onKeyPress={(e) => { e.key === 'Enter' && searchQuery && handleSearchSubmit() }} placeholder="Search Tomateto" />
                        </Search>
                        <SearchMenu open={searchMenuOpen} anchorEl={searchRef} onClose={handleSearchClose} onClick={handleSearchSubmit} query={searchQuery} />
                        {
                            isLoggedIn ?
                            <IconButtonWrapper>
                                <IconButton size="large"><AddBoxRoundedIcon fontSize="large"/></IconButton>
                                <IconButton size="large" onClick={() => { auth.signOut().then(() => navigate("/accounts/login")) }}><AccountCircleRoundedIcon fontSize="large" /></IconButton>
                            </IconButtonWrapper>
                            : 
                            <Button onClick={() => { navigate("/accounts/login") }} variant="contained">Log in</Button>
                        }
                    </ Stack>
                </Container>
            </StyledAppBar>
        </Box>
    );
}

export default PageAppBar;