import { Typography, Box, Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";

const LinkTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
})) as typeof Typography;

const NotFound = () => {
    return(
        <Box sx={{ p: 5 }}>
            <Stack spacing={5} alignItems="center" justifyContent="center">    
                <Typography variant="h5" align='center' sx={{ fontWeight: 700 }}>Sorry, the page you are looking for isn't available.</Typography>
                <Typography align='center'>The page or account may have been removed. <LinkTypography component={Link} to={"/"}>Go back to Tomateto.</LinkTypography></Typography>
            </Stack>
        </Box>
    )
}

export default NotFound;