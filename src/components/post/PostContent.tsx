import { Avatar, Card, CardContent, CardMedia, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import PostMenu from "./PostMenu";
import { PageLikeButton, PageLink, PagePhoto, PageShareButton } from "../page";

const PostContent = (props: any) => {
    console.log(new Date(props.response.date))
    return(
        <Card square={true}>
            <CardContent>
                <Stack spacing="15px">
                    <Stack direction="row" spacing="15px">
                        <Avatar />
                        <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
                            <Stack>
                                <Link to={`/${props.response.user.username}`}>{props.response.user.displayName}</Link>
                                <Typography>@{props.response.user.username}</Typography>
                            </Stack>
                            {props.response.isMine && <PostMenu items={props.response} />}
                        </Stack>
                    </Stack>
                    <Typography sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }} variant="h5">
                        {props.response.content}
                        {props.response.photo && <PagePhoto items={props.response} />}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Typography>14:15</Typography>
                        <Typography>•</Typography>
                        <Typography>31 May 2022</Typography>
                        {props.response.isEdited && <Typography>(edited)</Typography>}
                    </Stack>
                    <Divider />
                    <Stack direction="row" spacing={2}>
                        <Stack direction="row" spacing={1}>
                            <PageLink likes items={props.response} />
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            {props.response.commentsCount} Comment{ props.response.commentsCount > 1 && "s" }
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-around">
                        <IconButton>
                            <ModeCommentOutlinedIcon />
                        </IconButton>
                        <PageLikeButton items={props.response} />
                        <PageShareButton items={props.response} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default PostContent;