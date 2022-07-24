import { Box, Paper, Stack, styled, SvgIcon, useMediaQuery, useTheme } from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { ForgotPassword, Login, ResetPassword, Signup } from "../components/accounts";

import { ReactComponent as TomatetoLightLogo } from "../logos/tomatetolight-logo.svg";
import { ReactComponent as TomatetoBgLogo } from "../logos/tomatetobg-logo.svg";
import { renderToStaticMarkup } from "react-dom/server";

const StyledBackground = styled(Box)(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh', 
    alignItems: 'center', 
    justifyContent: 'center',

    backgroundRepeat: 'repeat',
    backgroundSize: '600px'
})) as typeof Box;

const Accounts = () => {
    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const bgSvg = encodeURIComponent(renderToStaticMarkup(<TomatetoBgLogo />));

    const navigate = useNavigate();

    return(
        <StyledBackground sx={{ backgroundImage: `url("data:image/svg+xml,${bgSvg}")` }}>
            <Paper elevation={ smUp ? 3 : 0 } sx={{ maxWidth: '540px', width: '100%', height: '600px', borderRadius: '30px', padding: "10px 30px 30px" }}>
                <Stack height="100%" alignItems="center" justifyContent="space-between" spacing={1}>
                    <SvgIcon onClick={() => {navigate('/')}} sx={{ width: '160px', height: '60px', cursor: 'pointer' }} component={TomatetoLightLogo} inheritViewBox />
                    <Box width="100%" height="100%">            
                        <Routes>
                            <Route path="login" element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />} />
                            <Route path="signup" element={isLoggedIn ? <Navigate to="/home" replace /> : <Signup />} />
                            <Route path="recover" element={<ForgotPassword />} />
                            <Route path="password_reset" element={<ResetPassword />} />
                            <Route path="*" element={<Navigate to="/404" replace />} />
                        </Routes>
                    </Box>
                </Stack>
            </Paper>
        </StyledBackground>
    )
}

export default Accounts;