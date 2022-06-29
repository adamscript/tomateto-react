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
                    <Stack sx={{ width: "100%" }} spacing={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack>
                                <PageLink user items={props.items} />
                                <Typography sx={{ color: theme => theme.palette.text.secondary }}>@{props.items.username}</Typography>
                            </Stack>
                            <PageFollowButton items={props.items} />
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