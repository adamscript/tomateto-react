import { Avatar, Box, ButtonBase, Card, CardContent, Divider, IconButton, Stack, styled, Typography } from "@mui/material";

import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

import { useNavigate } from "react-router-dom";
import PostMenu from "./PostMenu";
import { PageAvatarButton, PageLikeButton, PageLink, PagePhoto, PageShareButton, PageShowMore } from "../page";
import { Post } from "../../features/utility/types";

const Content = styled(Typography)(({ theme }) => ({

    wordWrap: "break-word", 
    whiteSpace: "pre-line",

    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical"

})) as typeof Typography;

interface FeedPostProps {
    items: Post;
}

const FeedPost = (props: FeedPostProps) => {
    const navigate = useNavigate();

    return(
        <>
        <Card square elevation={0}>
            <CardContent sx={{ pb: 1 }}>
                <Stack direction="row" alignItems="start" spacing={1}>
                    <PageAvatarButton items={props.items.user} />
                    <Stack spacing={1} width="100%" minWidth={0}>
                        <Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center" spacing={1} minWidth={0}>
                                    <PageLink user items={props.items.user} />
                                    <Typography noWrap sx={{ color: theme => theme.palette.text.secondary }}>@{props.items.user.username}</Typography>
                                    <Typography sx={{ color: theme => theme.palette.text.secondary }}>•</Typography>
                                    <PageLink post items={props.items} />
                                </Stack>
                                {props.items.isMine && <PostMenu items={props.items} />}
                            </Stack>
                            <Stack spacing={1}>
                                <Content sx={{ WebkitLineClamp: '4' }}>
                                    {props.items.content}
                                </Content>
                                {props.items.photo && <PagePhoto items={props.items} />}
                            </Stack>
                        </Stack>
                        <Box sx={{ maxWidth: 360 }}>
                            <Stack direction="row" justifyContent="space-between">
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <IconButton size="small" onClick={ () => { navigate(`/${props.items.user.username}/post/${props.items.id}`) }}><ModeCommentOutlinedIcon fontSize="inherit" /></IconButton>
                                    <Typography variant="body2" sx={{ color: theme => theme.palette.text.secondary }}>{ props.items.commentsCount && props.items.commentsCount > 0 ? props.items.commentsCount : null }</Typography>
                                </Stack>
                                <PageLikeButton feed items={props.items} />
                                <PageShareButton items={props.items} />
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </CardContent>
            { props.items.content.length > 280 || props.items.content && props.items.content.match(/\r\n|\r|\n/g) && props.items.content.match(/\r\n|\r|\n/g)!.length >= 4 ? <PageShowMore textPadding={8} height={40} onClick={ () => { navigate(`/${props.items.user.username}/post/${props.items.id}`) }}>Show this post</PageShowMore> : <></> }
            <Divider variant="middle" />
        </Card>
        </>
    )
}

export default FeedPost;