import { Avatar, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useState } from "react";
import CommentMenu from "./CommentMenu";
import { PageLikeButton } from "../page";

const Comment = (props: any) => {
    const [hover, setHover] = useState(false);

    return(
        <Card onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
            <CardContent>
                <Stack direction="row" alignItems="start" spacing={1}>
                    <Avatar />
                    <Stack spacing={1}  sx={{ width: "100%" }}>
                        <Stack alignItems="center" direction="row" spacing={1}>
                            <Link to={`/${props.items.user.username}`}>{props.items.user.displayName}</Link>
                            <Typography>@{props.items.user.username}</Typography>
                            <Typography>•</Typography>
                            <Typography>3h</Typography>
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