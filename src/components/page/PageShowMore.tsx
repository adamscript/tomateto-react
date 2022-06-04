import { Box, Button, Link, Typography } from "@mui/material";

const PageShowMore = (props:any) => {
    return(
        <Box sx={{ height: "60px", display: 'flex', alignItems: 'center' }}>
            <Button sx={{ height: "100%", width: "100%", justifyContent: 'start' }}>
                <Typography>Show More</Typography>
            </Button>
        </Box>
    )
}

export default PageShowMore;