import { Stack } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { FeedPost } from "../post";

const ExploreFeedTopPost = () => {
    const response = useAppSelector((state) => state.feedPost);

    const listFeedPost = response.map((items, index) => 
        <FeedPost key={index} items={items} />
    )

    return(
        <Stack>
            {listFeedPost}
        </Stack>
    )
}

export default ExploreFeedTopPost;