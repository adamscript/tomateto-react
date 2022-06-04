import { Avatar, Card, CardContent, Divider, IconButton, Link, Stack, Typography } from "@mui/material";

import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';


const Post = () => {
    return(
        <Card square={true}>
            <CardContent>
                <Stack spacing="15px">
                    <Stack direction="row" spacing="15px">
                        <Avatar />
                        <Stack>
                            <Link href="#" underline="hover">Tabby Avery</Link>
                            <Typography>@catinthepiratehat</Typography>
                        </Stack>
                    </Stack>
                    <Typography variant="h5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Typography>14:18</Typography>
                        <Typography>•</Typography>
                        <Typography>31 May 2022</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" spacing={2}>
                        <Stack direction="row" spacing={1}>
                            <Link href="#" underline="hover">30 Likes</Link>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Link href="#" underline="hover">30 Replies</Link>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-around">
                        <IconButton>
                            <ModeCommentOutlinedIcon />
                        </IconButton>
                        <IconButton>
                            <FavoriteBorderOutlinedIcon />
                        </IconButton>
                        <IconButton>
                            <IosShareOutlinedIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default Post;