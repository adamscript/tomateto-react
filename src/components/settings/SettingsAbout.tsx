import { Box, Stack, IconButton, Typography, SvgIcon, styled } from "@mui/material";
import { PageLabel } from "../page";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ReactComponent as TomatetoLightLogo } from "../../logos/tomatetolight-logo.svg";

const LinkTypography = styled(Typography)(({ theme }) => ({
    display: 'inline-flex',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
})) as typeof Typography;

const SettingsAbout = () => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = "About - Tomateto"
    }, [])

    return(
        <Box padding="0 16px 32px">
            <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%', position: 'sticky', top: 0, backgroundColor: theme => theme.palette.background.default, zIndex: 1 }}>
                <IconButton size="small" onClick={ () => { location.state ? navigate('..', { state: { reaunthenticated: true }}) : navigate('/settings') } }>
                    <ArrowBackIcon />
                </IconButton>
                <PageLabel>About Tomateto</PageLabel>
            </Stack>
            <Stack spacing={2} sx={{ display: 'inline-flex' }}>
                <SvgIcon sx={{ maxWidth: '320px', width: '100%', height: '120px' }} component={TomatetoLightLogo} inheritViewBox />
                <Typography>
                    Tomateto is a personal project built by Adam Darmawan as a means to learn full-stack web development.
                </Typography>
                <Typography>
                    You can find him on Tomateto and LinkedIn as @adamscript. His inbox is also open at adam@adamscript.com. If you have any questions, suggestions, or just want to let him know how awesome he is, feel free to send him an email. He'll really appreciate it (and probably cry a little bit, depends on what you tell him).
                </Typography>
                <Typography sx={{ display: 'inline-flex' }}>Finally, you can learn more about the creator of Tomateto on his personal website.</Typography>
                <LinkTypography component='a' href="https://www.adamscript.com">adamscript.com</LinkTypography>
            </Stack>
        </Box>
    )
}

export default SettingsAbout;