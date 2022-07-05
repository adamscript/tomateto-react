import { Avatar, Box, ButtonBase, Divider, IconButton, Stack, styled, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import PostMenu from "./PostMenu";
import { PageAvatarButton, PageLikeButton, PageLink, PagePhoto, PageShareButton } from "../page";

const SecondaryTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary
})) as typeof Typography;

const PostContent = (props: any) => {

    console.log(props.response)
    
    const handleComment = () => {
        props.inputRef.current.focus();
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
                    <SecondaryTypography>14:15</SecondaryTypography>
                    <SecondaryTypography>•</SecondaryTypography>
                    <SecondaryTypography>31 May 2022</SecondaryTypography>
                    {
                        props.response.isEdited && 
                        <><SecondaryTypography>•</SecondaryTypography>
                        <SecondaryTypography>Edited</SecondaryTypography></>
                    }
                </Stack>
                <Divider light />
                {    
                    props.response.likesCount || props.response.commentsCount ?
                    <><Stack direction="row" spacing={2}>
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