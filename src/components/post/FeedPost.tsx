import { Avatar, Box, ButtonBase, Card, CardActionArea, CardContent, CardHeader, CardMedia, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Link, useNavigate } from "react-router-dom";

//onClick={() => navigate(`${props.items.user.username}/post/${props.items.id}`)}

const FeedPost = (props: any) => {
    const navigate = useNavigate();

    return(
        <Card square={true}>
                <Grid container>
                    <Grid item xs={1}>
                        <CardContent>
                            <Avatar></Avatar>
                        </CardContent>
                        
                    </Grid>
                    <Grid item xs={11}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Link to={`/${props.items.user.username}`}>{props.items.user.displayName}</Link>
                                <Typography>@{props.items.user.username}</Typography>
                                <Typography>•</Typography>
                                <Link to={`/${props.items.user.username}/post/${props.items.id}`}>3h</Link>
                            </Stack>
                            <Typography>
                                {props.items.content}
                            </Typography>
                            {/*<CardMedia component="img" image="https://pbs.twimg.com/media/FUMBh4CWYAEnzxw?format=jpg&name=large"></CardMedia>*/}
                        </CardContent>
                        <Stack direction="row" spacing={15}>
                            <Stack direction="row" alignItems="center">
                                <IconButton><ModeCommentOutlinedIcon /></IconButton>
                                <Typography>{props.items.commentsCount}</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <IconButton><FavoriteBorderOutlinedIcon /></IconButton>
                                <Typography>{props.items.likesCount}</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <IconButton><IosShareIcon /></IconButton>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

        <Divider />
        </Card>
    )
}

export default FeedPost;