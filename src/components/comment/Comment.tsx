import { Avatar, Box, ButtonBase, Card, CardActionArea, CardContent, Divider, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { useState } from "react";
import CommentMenu from "./CommentMenu";
import { PageAvatarButton, PageLikeButton, PageLink } from "../page";

const Comment = (props: any) => {
    const [hover, setHover] = useState(false);

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Card onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }} elevation={0} sx={{ position: 'relative' }}>
            <CardContent>
                <Stack direction="row" alignItems="start" spacing={1}>
                    <PageAvatarButton items={props.items.user} />
                    <Stack direction="row" minWidth={0} width="100%" justifyContent="space-between" spacing={2}>
                        <Stack minWidth={0}>
                            <Stack alignItems="center" direction="row" spacing={1}>
                                <PageLink user items={props.items.user} />
                                <Typography noWrap sx={{ color: theme => theme.palette.text.secondary }}>@{props.items.user.username}</Typography>
                                <Typography sx={{ color: theme => theme.palette.text.secondary }}>•</Typography>
                                <PageLink comment items={props.items} />
                            </Stack>
                            <Typography sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
                                {props.items.content}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="start">
                            { hover && !smDown && props.items.isMine && <CommentMenu items={props.items} /> }
                            <Stack alignItems="center">
                                <PageLikeButton comment items={props.items} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
            { smDown && <CommentMenu area items={props.items} /> }
        </Card>
    )
}

export default Comment;