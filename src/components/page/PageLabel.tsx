import { Box, Typography } from "@mui/material";

const PageLabel = (props:any) => {
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{ props.children }</Typography>
        </Box>
    )
}

export default PageLabel;