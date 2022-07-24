import { Avatar, Box, Button, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "../../features/utility/types";
import { PageFollowButton, PageLink } from "../page";

const EditProfileButton = styled(Button)(({ theme }) => ({
    height: "36px", 
    minWidth: 120,
    color: theme.palette.text.primary, 
    borderColor: theme.palette.action.focus,
    '&:hover': {
        borderColor: theme.palette.action.focus,
        backgroundColor: theme.palette.action.hover
    }
})) as typeof Button;

const AvatarProfile = styled(Avatar)(({ theme }) => ({
    width: 80,
    height: 80,
    
    [theme.breakpoints.up('sm')]: {
        width: 135,
        height: 135
    }
})) as typeof Avatar;

interface UserProfileProps {
    response: User;
}

const UserProfile = (props: UserProfileProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleEditProfile = () => {
        navigate('/settings/profile', {
            state: {
                backgroundLocation: location
            }
        });
    }
    
    return(
        <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} minWidth={0}>
                <AvatarProfile src={ smUp ? props?.response?.avatar?.default : props?.response?.avatar?.medium } />
                <Stack spacing={2} sx={{ width: 1 }} minWidth={0}>
                    <Stack direction="row" spacing={1} alignItems="start" justifyContent="space-between">
                        <Stack minWidth={0}>
                            <Typography noWrap variant="h6" sx={{ fontWeight: 700 }}>{props.response.displayName}</Typography>
                            <Typography noWrap sx={{ color: theme => theme.palette.text.secondary }}>@{props.response.username}</Typography>
                        </Stack>
                        {   props.response.isMine ?
                            <EditProfileButton variant="outlined" onClick={handleEditProfile}>Edit Profile</EditProfileButton> :
                            <PageFollowButton items={props.response} />
                        }
                    </Stack>
                    <Typography sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
                        {props.response.bio}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography component='div' sx={{ fontWeight: 500, fontSize: 14 }}>{props.response.postsCount} <Typography display="inline" sx={{ color: theme => theme.palette.text.secondary, fontSize: 14 }}>Post{ props.response.postsCount && props.response.postsCount > 1 ? 's' : '' }</Typography></Typography>
                        <PageLink following items={props.response} />
                        <PageLink followers items={props.response} />
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default UserProfile;