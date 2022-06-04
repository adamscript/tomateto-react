import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Divider, Grid, IconButton, Link, Stack, Typography } from "@mui/material";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';


const FeedPost = () => {
    return(
        <Card square={true}>
            <Grid container>
                <Grid item xs={1}>
                    <CardContent>
                        <Avatar></Avatar>
                    </CardContent>
                    
                </Grid>
                <Grid item xs={11}>
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Link href="#" underline="hover">Tabby Avery</Link>
                            <Typography>@catinthepiratehat</Typography>
                            <Typography>•</Typography>
                            <Typography>3h</Typography>
                        </Stack>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Typography>
                        {/*<CardMedia component="img" image="https://pbs.twimg.com/media/FUMBh4CWYAEnzxw?format=jpg&name=large"></CardMedia>*/}
                    </CardContent>
                    <Stack direction="row" spacing={15}>
                        <Stack direction="row" alignItems="center">
                            <IconButton><ModeCommentOutlinedIcon /></IconButton>
                            <Typography>30</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <IconButton><FavoriteBorderOutlinedIcon /></IconButton>
                            <Typography>30</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <IconButton><IosShareIcon /></IconButton>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>

        <Divider />
        </Card>
    )
}

export default FeedPost;