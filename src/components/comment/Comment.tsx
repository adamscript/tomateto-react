import { Avatar, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Comment = (props: any) => {
    return(
        <Card>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <Avatar />
                    <Stack spacing={1}>
                        <Stack alignItems="center" direction="row" spacing={1}>
                            <Link to={`/${props.items.user.username}`}>{props.items.user.displayName}</Link>
                            <Typography>@{props.items.user.username}</Typography>
                            <Typography>•</Typography>
                            <Typography>3h</Typography>
                        </Stack>
                        <Typography>
                            {props.items.content}
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