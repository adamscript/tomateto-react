import { Avatar, Card, CardContent, IconButton, Link, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Comment = () => {
    return(
        <Card>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <Avatar />
                    <Stack spacing={1}>
                        <Stack alignItems="center" direction="row" spacing={1}>
                            <Link href="#" underline="hover">Tabby Avery</Link>
                            <Typography>@catinthepiratehat</Typography>
                            <Typography>•</Typography>
                            <Typography>3h</Typography>
                        </Stack>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Typography>
                    </Stack>
                    <Stack alignItems="center">
                        <IconButton>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <Typography>30</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default Comment;