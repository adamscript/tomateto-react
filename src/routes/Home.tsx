import { Box } from "@mui/material";
import { FeedNewPost, FeedPost } from "../components/post";

const Home = () => {
    return(
        <Box>
            <FeedNewPost />
            <FeedPost />
            <FeedPost />
            <FeedPost />
            <FeedPost />
            <FeedPost />
            <FeedPost />
        </Box>
    )
}

export default Home;