import { Box, Typography } from "@mui/material";

interface PageLabelProps {
    children: string;
}

const PageLabel = (props: PageLabelProps) => {
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{ props.children }</Typography>
        </Box>
    )
}

export default PageLabel;