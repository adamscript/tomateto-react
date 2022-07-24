import { alpha, Box, ClickAwayListener, Grow, IconButton, InputBase, MenuItem, MenuList, Paper, Popper, SvgIcon, styled, Typography, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { useState, useRef, ReactElement, RefObject } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { ReactComponent as TomatetoLightIcon } from "../../logos/tomatetolight-icon.svg";
import { useAppSelector } from "../../app/hooks";

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
        paddingBottom: 4,
        width: '100%'
    }
})) as typeof Box;

interface SearchMenuProps {
    open: boolean;
    anchorEl: RefObject<HTMLDivElement>;
    onClose: () => void;
    onClick: () => void;
    query: string;
}

const SearchMenu = (props: SearchMenuProps) => {
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

const PageSearchInput = () => {
    const [searchMenuOpen, setSearchMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(String);
    const searchRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const isLoggedIn = useAppSelector(state => state.authState.isLoggedIn);

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);

        e.preventDefault();
        
        if(location.pathname == '/search'){

            setSearchParams({q: e.target.value}, {replace: true});
            console.log(searchParams)
            
        }
        else if(location.pathname == '/explore'){
            navigate(`search?q=${e.target.value}`);
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
        <Box >
              <SearchContainer>
                  {
                      smDown && location.pathname == '/explore' && !isLoggedIn &&
                      <SvgIcon sx={{ width: '36px', height: '36px' }} component={TomatetoLightIcon} inheritViewBox />
                  }
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
        </Box>
    )
}

export default PageSearchInput;