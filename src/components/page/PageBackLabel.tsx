import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PageBackLabelProps {
    children: string;
}

const PageBackLabel = (props: PageBackLabelProps) => {
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