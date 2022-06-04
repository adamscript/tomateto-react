import { Avatar, Button, Card, CardContent, Link, Stack, Typography } from "@mui/material";

const UserRecommendation = () => {
    return(
        <Card>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <Avatar />
                    <Stack sx={{ width: "100%" }} spacing={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack>
                                <Link href="#" underline="hover">Tabby Avery</Link>
                                <Typography>@catinthepiratehat</Typography>
                            </Stack>
                            <Button variant="contained">Follow</Button>
                        </Stack>
                        <Typography>
                            an artist who is trying to jump ship to software engineering
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default UserRecommendation;