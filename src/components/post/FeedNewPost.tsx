import { Box, Divider } from "@mui/material";
import NewPost from "./NewPost";

const FeedNewPost = () => {
    return(
        <Box sx={{ mt: 3 }}>
            <NewPost />
            <Divider variant="middle" />
        </Box>
    )
}

export default FeedNewPost;