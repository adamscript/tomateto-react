import { Avatar, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserRecommendation = (props: any) => {
    return(
        <Card>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <Avatar />
                    <Stack sx={{ width: "100%" }} spacing={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack>
                                <Link to={`/${props.items.username}`}>{props.items.displayName}</Link>
                                <Typography>@{props.items.username}</Typography>
                            </Stack>
                            <Button variant="contained">Follow</Button>
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