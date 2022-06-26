import { Avatar, Button, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLink } from "../page";

const UserProfile = (props: any) => {
    
    return(
        <Card square={true}>
            <CardContent>
                <Stack direction="row" spacing={2}>
                    <Avatar sx={{ width: 135, height: 135 }} />
                    <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack>
                                <Typography variant="h6">{props.response.displayName}</Typography>
                                <Typography>@{props.response.username}</Typography>
                            </Stack>
                            {   props.response.isMine ?
                                <Button variant="outlined" sx={{ height: "36px" }}>Edit Profile</Button> :
                                    props.response.isFollowed ?
                                    <Button variant="outlined" sx={{ height: "36px" }}>Followed</Button> :
                                    <Button variant="contained" sx={{ height: "36px" }}>Follow</Button>
                            }
                        </Stack>
                        <Typography>
                            {props.response.bio}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Typography>50 Posts</Typography>
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