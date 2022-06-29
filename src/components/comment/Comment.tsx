import { Avatar, Card, CardContent, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useState } from "react";
import CommentMenu from "./CommentMenu";
import { PageAvatarButton, PageLikeButton, PageLink } from "../page";

const Comment = (props: any) => {
    const [hover, setHover] = useState(false);

    return(
        <Card onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }} elevation={0}>
            <CardContent>
                <Stack direction="row" alignItems="start" spacing={1}>
                    <PageAvatarButton items={props.items.user} />
                    <Stack sx={{ width: "100%" }}>
                        <Stack alignItems="center" direction="row" spacing={1}>
                            <PageLink user items={props.items.user} />
                            <Typography sx={{ color: theme => theme.palette.text.secondary }}>@{props.items.user.username}</Typography>
                            <Typography sx={{ color: theme => theme.palette.text.secondary }}>•</Typography>
                            <PageLink comment items={props.items} />
                        </Stack>
                        <Typography sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
                            {props.items.content}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="start">
                        { hover && props.items.isMine && <CommentMenu items={props.items} /> }
                        <Stack alignItems="center">
                            <PageLikeButton comment items={props.items} />
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default Comment;