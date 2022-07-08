import { Box, Card, CardContent, CardMedia, Divider, Skeleton, Stack } from "@mui/material";

const PostSkeleton = () => {
    return(
        <>
        <Card square elevation={0}>
            <CardContent sx={{ pb: 1 }}>
                <Stack direction="row" alignItems="start" spacing={1}>
                    <Box width={48} height={48}>
                        <Skeleton variant="circular" animation="wave" width={48} height={48} />
                    </Box>
                    <Stack spacing={1} width="100%">
                        <Skeleton variant="text" animation="wave" width="40%" />
                        <Skeleton variant="text" animation="wave" width="100%" />
                        <Skeleton variant="text" animation="wave" width="60%" />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
        <Divider variant="middle" />
        <Card square elevation={0}>
            <CardContent sx={{ pb: 1 }}>
                <Stack direction="row" alignItems="start" spacing={1}>
                    <Box width={48} height={48}>
                        <Skeleton variant="circular" animation="wave" width={48} height={48} />
                    </Box>
                    <Stack spacing={1} width="100%">
                        <Skeleton variant="text" animation="wave" width="40%" />
                        <Skeleton variant="text" animation="wave" width="60%" />
                        <CardMedia component={Skeleton} variant="rectangular" animation="wave" width="100%" height={300} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
        <Divider variant="middle" />
        <Card square elevation={0}>
            <CardContent sx={{ pb: 1 }}>
                <Stack direction="row" alignItems="start" spacing={1}>
                    <Box width={48} height={48}>
                        <Skeleton variant="circular" animation="wave" width={48} height={48} />
                    </Box>
                    <Stack spacing={1} width="100%">
                        <Skeleton variant="text" animation="wave" width="40%" />
                        <Skeleton variant="text" animation="wave" width="100%" />
                        <Skeleton variant="text" animation="wave" width="60%" />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
        </>
    )
}

export default PostSkeleton;