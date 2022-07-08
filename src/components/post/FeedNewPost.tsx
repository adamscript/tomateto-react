import { Box, Divider } from "@mui/material";
import NewPost from "./NewPost";

const FeedNewPost = () => {
    return(
        <Box>
            <NewPost />
            <Divider variant="middle" />
        </Box>
    )
}

export default FeedNewPost;