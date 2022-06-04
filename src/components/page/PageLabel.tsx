import { Box, Typography } from "@mui/material";

const PageLabel = (props:any) => {
    return(
        <Box sx={{ height: "60px", display: 'flex', alignItems: 'center'}}>
            <Typography variant="h6">{ props.children }</Typography>
        </Box>
    )
}

export default PageLabel;