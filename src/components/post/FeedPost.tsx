import { Avatar, Box, Button, ButtonBase, Card, CardActionArea, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Stack, Typography } from "@mui/material";

import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';

import { Link, useNavigate } from "react-router-dom";
import PostMenu from "./PostMenu";
import { PageLikeButton, PagePhoto } from "../page";

//onClick={() => navigate(`${props.items.user.username}/post/${props.items.id}`)}

const FeedPost = (props: any) => {
    const navigate = useNavigate();

    return(
        <>
        <Card square={true}>
                <Grid container>
                    <Grid item xs={1}>
                        <CardContent>
                            <Avatar src={props.items.user.avatar} />
                        </CardContent>
                    </Grid>
                    <Grid item xs={11}>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Link to={`/${props.items.user.username}`}>{props.items.user.displayName}</Link>
                                    <Typography>@{props.items.user.username}</Typography>
                                    <Typography>•</Typography>
                                    <Link to={`/${props.items.user.username}/post/${props.items.id}`}>3h</Link>
                                    {props.items.isEdited && <Typography>(edited)</Typography>}
                                </Stack>
                                {props.items.isMine && <PostMenu items={props.items} />}
                            </Stack>
                            <Typography sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
                                {props.items.content}
                            </Typography>
                            {props.items.photo && <PagePhoto items={props.items} />}
                        </CardContent>
                        <Stack direction="row" spacing={15}>
                            <Stack direction="row" alignItems="center">
                                <IconButton><ModeCommentOutlinedIcon /></IconButton>
                                <Typography>{props.items.commentsCount}</Typography>
                            </Stack>
                            <PageLikeButton feed items={props.items} />
                            <Stack direction="row" alignItems="center">
                                <IconButton><IosShareIcon /></IconButton>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
        <Divider />
        </Card>
        </>
    )
}

export default FeedPost;