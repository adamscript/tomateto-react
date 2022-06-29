import { alpha, Box, Button, Link, styled, Typography } from "@mui/material";

const TextButton = styled(Button)(({ theme }) => ({
    height: 60,
    width: '100%',
    justifyContent: 'start',
    borderRadius: 0,
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: alpha(theme.palette.text.secondary, theme.palette.action.hoverOpacity)
    }
})) as typeof Button;

const PageShowMore = (props:any) => {
    return(
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextButton onClick={props.onClick}>
                <Typography sx={{ pl: 1 }}>{props.children}</Typography>
            </TextButton>
        </Box>
    )
}

export default PageShowMore;