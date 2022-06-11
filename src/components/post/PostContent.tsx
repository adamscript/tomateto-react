import { Avatar, Card, CardContent, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';

const PostContent = (props: any) => {
    return(
        <Card square={true}>
            <CardContent>
                <Stack spacing="15px">
                    <Stack direction="row" spacing="15px">
                        <Avatar />
                        <Stack>
                            <Link to={`/${props.response.user.username}`}>{props.response.user.displayName}</Link>
                            <Typography>@{props.response.user.username}</Typography>
                        </Stack>
                    </Stack>
                    <Typography variant="h5">
                        {props.response.content}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Typography>14:18</Typography>
                        <Typography>•</Typography>
                        <Typography>31 May 2022</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" spacing={2}>
                        <Stack direction="row" spacing={1}>
                            <Link to="#">30 Likes</Link>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Link to="#">30 Replies</Link>
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

export default PostContent;