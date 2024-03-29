import { Avatar, Box, ButtonBase, Divider, IconButton, Stack, styled, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import PostMenu from "./PostMenu";
import { PageAvatarButton, PageLikeButton, PageLink, PagePhoto, PageShareButton } from "../page";
import { format, parseISO } from "date-fns";
import { Post } from "../../features/utility/types";
import { RefObject } from "react";
import { useAppSelector } from "../../app/hooks";

const SecondaryTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary
})) as typeof Typography;

interface PostContentProps {
    response: Post;
    inputRef: RefObject<HTMLInputElement>;
}

const PostContent = (props: PostContentProps) => {

    const navigate = useNavigate();
    const isLoggedIn = useAppSelector((state) => state.authState.isLoggedIn);

    const handleComment = () => {
        { 
            if(isLoggedIn){
                props.inputRef?.current?.focus();
            }
            else{
                navigate('/accounts/login', { state: { 
                    isLoggedIn: false
                } })
            }
        }
    };

    return(
        <Box sx={{ p: 2, pb: 1 }}>
            <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                    <PageAvatarButton items={props.response.user} />
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                        <Stack width="80%">
                            <PageLink user items={props.response.user} />
                            <Typography noWrap sx={{ color: theme => theme.palette.text.secondary }}>@{props.response.user.username}</Typography>
                        </Stack>
                        {props.response.isMine && <PostMenu items={props.response} />}
                    </Stack>
                </Stack>
                <Typography sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }} variant="h5">
                    {props.response.content}
                </Typography>
                {props.response.photo && <PagePhoto items={props.response} />}
                <Stack direction="row" spacing={1}>
                    <SecondaryTypography>{format(parseISO(props.response.date), 'HH:mm')}</SecondaryTypography>
                    <SecondaryTypography>•</SecondaryTypography>
                    <SecondaryTypography>{format(parseISO(props.response.date), 'PP')}</SecondaryTypography>
                    {
                        props.response.isEdited && 
                        <><SecondaryTypography>•</SecondaryTypography>
                        <SecondaryTypography>Edited</SecondaryTypography></>
                    }
                </Stack>
                <Divider light />
                {    
                    props.response.likesCount || props.response.commentsCount ?
                    <><Stack direction="row" alignItems="center" spacing={2}>
                        { props.response.likesCount ? <PageLink likes items={props.response} /> : <></> }
                        {
                            props.response.commentsCount ?
                            <Typography component="div" sx={{ fontSize: 14, fontWeight: 500 }}>{props.response.commentsCount} <SecondaryTypography display="inline" sx={{ fontSize: 14 }}>Comment{ props.response.commentsCount > 1 && "s" }</SecondaryTypography></Typography> :
                            <></>
                        }
                    </Stack>
                    <Divider light /></> :
                    <></>
                }
            </Stack>
            <Stack direction="row" justifyContent="space-around" sx={{ pt: 1 }}>
                <IconButton onClick={handleComment}>
                    <ModeCommentOutlinedIcon />
                </IconButton>
                <PageLikeButton content items={props.response} />
                <PageShareButton content items={props.response} />
            </Stack>
        </Box>
    )
}

export default PostContent;