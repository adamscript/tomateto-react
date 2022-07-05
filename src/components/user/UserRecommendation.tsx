import { Avatar, ButtonBase, Card, CardContent, Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageAvatarButton, PageFollowButton, PageLink } from "../page";

const UserRecommendation = (props: any) => {
    const navigate = useNavigate();

    return(
        <Card elevation={0}>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <PageAvatarButton items={props.items} />
                    <Stack width="100%" minWidth={0} spacing={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <Stack minWidth={0} >
                                <PageLink user items={props.items} />
                                <Typography noWrap sx={{ color: theme => theme.palette.text.secondary }}>@{props.items.username}</Typography>
                            </Stack>
                            { !props.items.isMine && <PageFollowButton items={props.items} /> }
                        </Stack>
                        <Typography>
                            {props.items.bio}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default UserRecommendation;