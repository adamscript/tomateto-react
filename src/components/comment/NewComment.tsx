import { Avatar, Button, Card, CardContent, IconButton, InputBase, Stack } from "@mui/material";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

const NewComment = () => {
    return(
        <Card>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar />
                    <Stack sx={{ width: "100%" }} direction="row" justifyContent="space-between" spacing={1}>
                        <InputBase placeholder="Add a tomathought..." />
                        <Stack direction="row" spacing={1}>
                            <IconButton>
                                <EmojiEmotionsOutlinedIcon />
                            </IconButton>
                            <Button variant="contained">Comment</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default NewComment;