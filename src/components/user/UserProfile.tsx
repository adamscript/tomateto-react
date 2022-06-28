import { Avatar, Button, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageFollowButton, PageLink } from "../page";

const UserProfile = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleEditProfile = () => {
        navigate('/settings/profile', {
            state: {
                backgroundLocation: location
            }
        });
    }
    
    return(
        <Card square={true}>
            <CardContent>
                <Stack direction="row" spacing={2}>
                    <Avatar sx={{ width: 135, height: 135 }} src={props.response.avatar} />
                    <Stack spacing={2} sx={{ width: 1 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack>
                                <Typography variant="h6">{props.response.displayName}</Typography>
                                <Typography>@{props.response.username}</Typography>
                            </Stack>
                            {   props.response.isMine ?
                                <Button variant="outlined" sx={{ height: "36px" }} onClick={handleEditProfile}>Edit Profile</Button> :
                                <PageFollowButton items={props.response} />
                            }
                        </Stack>
                        <Typography sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
                            {props.response.bio}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Typography>{props.response.postsCount} Posts</Typography>
                            <PageLink following items={props.response} />
                            <PageLink followers items={props.response} />
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default UserProfile;