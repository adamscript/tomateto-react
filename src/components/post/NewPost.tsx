import { Avatar, Button, CardContent, Grid, IconButton, InputBase, Stack } from "@mui/material";

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

const NewPost = () => {

    return(
        <Grid container>
            <Grid item xs={1}>
                <CardContent>
                    <Avatar />
                </CardContent>
            </Grid>
            <Grid item xs={11}>
                <CardContent>
                    <InputBase placeholder="What's on your to-mind?" />
                </CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row">
                        <IconButton>
                            <ImageOutlinedIcon />
                        </IconButton>
                        <IconButton>
                            <EmojiEmotionsOutlinedIcon />
                        </IconButton>
                    </Stack>
                    <Button variant="contained">Post</Button>
                </Stack>
            </Grid>
        </Grid>
    )
};

export default NewPost;