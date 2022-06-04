import { AppBar, Box, Typography, InputBase, Stack, IconButton } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { Container, shadows } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

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
    fontSize: '14px',
}));

const IconButtonWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 3,
}))

const PageAppBar = () => {
    return(
        <Box>
            <StyledAppBar elevation={1}>
                <Container maxWidth="md">
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Logo>tomateto</Logo>
                        <Search>
                            <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                            <SearchInput placeholder="Search Tomateto" />
                        </Search>
                        <IconButtonWrapper>
                            <IconButton size="large"><AddBoxRoundedIcon fontSize="large"/></IconButton>
                            <IconButton size="large"><AccountCircleRoundedIcon fontSize="large" /></IconButton>
                        </IconButtonWrapper>
                    </ Stack>
                </Container>
            </StyledAppBar>
        </Box>
    );
}

export default PageAppBar;