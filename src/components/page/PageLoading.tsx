import { SvgIcon, Stack, useTheme, useMediaQuery, Typography, CircularProgress } from "@mui/material";

import { ReactComponent as TomatetoLightLogo } from "../../logos/tomatetolight-logo.svg";
import { ReactComponent as TomatetoLightIcon } from "../../logos/tomatetolight-icon.svg";
import { useEffect } from "react";

const PageLoading = (props: any) => {

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    return(
        <Stack width="100%" height="100vh" alignItems="center" justifyContent="center" spacing={3} padding="12px">
            { smUp ? <SvgIcon sx={{ width: '540px', height: '120px' }} component={TomatetoLightLogo} inheritViewBox /> : <SvgIcon sx={{ width: '80px', height: '80px' }} component={TomatetoLightIcon} inheritViewBox /> }
            { props.message && <Typography align="center">{props.message}</Typography> }
            { props.spinner && <CircularProgress /> }
        </Stack>
    )
}

export default PageLoading;