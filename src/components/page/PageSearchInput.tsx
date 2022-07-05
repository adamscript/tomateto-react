import { alpha, Box, ClickAwayListener, Grow, IconButton, InputBase, MenuItem, MenuList, Paper, Popper, Slide, styled, Typography, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    borderRadius: '30px',
    backgroundColor: alpha(theme.palette.common.black, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: '42px',

    [theme.breakpoints.down('sm')]: {
        width: '100vw'
    }
  }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    paddingLeft: 9,
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.disabled,
  }));

const IconButtonWrapper = styled('div')(({ theme }) => ({
    paddingRight: 9,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
    padding: 12,
    height: '100%',
    width: '100%',
    fontSize: '14px',
})) as typeof InputBase;

const SearchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 12,

    [theme.breakpoints.down('sm')]: {
        backgroundColor: theme.palette.background.default,
        position: 'fixed',
        width: 'calc(100vw - 24px)',
        zIndex: 3
    }
})) as typeof Box;

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

const HideOnScroll = (props: any) => {
    const { children } = props;
    const scrollTrigger = useScrollTrigger();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const location = useLocation();
  
    return(
      <Slide appear={false} direction="down" in={ smDown && location.pathname == '/explore' ? !scrollTrigger : true }>
        {children}
      </Slide>
    )
  }

const PageSearchInput = () => {
    const [searchMenuOpen, setSearchMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(String);
    const searchRef = useRef(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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

    const handleSearchClear = () => {
        setSearchQuery('');
        navigate('/explore');
        searchInputRef?.current?.focus();   
    }

    const handleSearchBack = () => {
        setSearchQuery('');
        navigate('/explore');
    }

    return(
        <Box>
            <HideOnScroll>
                <SearchContainer>
                    {
                        smDown && location.pathname == '/search' &&
                        <IconButton onClick={handleSearchBack} size='small'>
                            <ArrowBackIcon />
                        </IconButton>
                    }
                    <Search ref={searchRef}>
                        { smDown && location.pathname == '/search' ? <></> : <SearchIconWrapper><SearchIcon /></SearchIconWrapper> }
                        <SearchInput inputRef={searchInputRef} onChange={handleSearch} value={searchQuery} onKeyPress={(e) => { e.key === 'Enter' && searchQuery && handleSearchSubmit() }} placeholder="Search Tomateto" />
                        {
                            searchQuery &&
                            <IconButtonWrapper>
                                <IconButton size='small' onClick={handleSearchClear}>
                                    <ClearIcon />
                                </IconButton>
                            </IconButtonWrapper>
                        }
                    </Search>
                    <SearchMenu open={searchMenuOpen} anchorEl={searchRef} onClose={handleSearchClose} onClick={handleSearchSubmit} query={searchQuery} />
                </SearchContainer>
            </HideOnScroll>
        </Box>
    )
}

export default PageSearchInput;