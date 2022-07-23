import { SvgIcon, Stack, useTheme, useMediaQuery } from "@mui/material";

import { ReactComponent as TomatetoLightLogo } from "../../logos/tomatetolight-logo.svg";
import { ReactComponent as TomatetoLightIcon } from "../../logos/tomatetolight-icon.svg";

const PageLoading = () => {

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    return(
        <Stack width="100%" height="100vh" alignItems="center" justifyContent="center">
            { smUp ? <SvgIcon sx={{ width: '540px', height: '120px' }} component={TomatetoLightLogo} inheritViewBox /> : <SvgIcon sx={{ width: '80px', height: '80px' }} component={TomatetoLightIcon} inheritViewBox /> }
        </Stack>
    )
}

export default PageLoading;