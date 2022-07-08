import { Card, CardContent, Stack, Box, Skeleton } from "@mui/material";

const UserSkeleton = () => {
    return(
        <>
        <Card elevation={0}>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <Box width={48} height={48}>
                        <Skeleton variant="circular" animation="wave" width={48} height={48} />
                    </Box>
                    <Stack spacing={1} width="100%">
                        <Skeleton variant="text" animation="wave" width="30%" />
                        <Skeleton variant="text" animation="wave" width="20%" />
                        <Skeleton variant="text" animation="wave" width="90%" />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
        <Card elevation={0}>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <Box width={48} height={48}>
                        <Skeleton variant="circular" animation="wave" width={48} height={48} />
                    </Box>
                    <Stack spacing={1} width="100%">
                        <Skeleton variant="text" animation="wave" width="30%" />
                        <Skeleton variant="text" animation="wave" width="20%" />
                        <Skeleton variant="text" animation="wave" width="90%" />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
        <Card elevation={0}>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <Box width={48} height={48}>
                        <Skeleton variant="circular" animation="wave" width={48} height={48} />
                    </Box>
                    <Stack spacing={1} width="100%">
                        <Skeleton variant="text" animation="wave" width="30%" />
                        <Skeleton variant="text" animation="wave" width="20%" />
                        <Skeleton variant="text" animation="wave" width="90%" />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
        </>
    )
}

export default UserSkeleton;