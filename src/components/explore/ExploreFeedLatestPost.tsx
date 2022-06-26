import { List } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { FeedPost } from "../post";

const ExploreFeedLatestPost = () => {
    const response = useAppSelector((state) => state.feedPost);

    const listFeedPost = response.map((items, index) => 
        <FeedPost key={index} items={items} />
    )

    return(
        <List>
            {listFeedPost}
        </List>
    )
}

export default ExploreFeedLatestPost;