import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageBackLabel = (props: any) => {
    return(
        <Box sx={{ height: "60px", display: 'flex', alignItems: 'center'}}>
            <IconButton>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">{ props.children }</Typography>
        </Box>
    )
}

export default PageBackLabel;