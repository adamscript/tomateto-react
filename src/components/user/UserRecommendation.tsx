import { Avatar, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PageFollowButton } from "../page";

const UserRecommendation = (props: any) => {
    return(
        <Card>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <Avatar src={props.items.avatar} />
                    <Stack sx={{ width: "100%" }} spacing={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack>
                                <Link to={`/${props.items.username}`}>{props.items.displayName}</Link>
                                <Typography>@{props.items.username}</Typography>
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