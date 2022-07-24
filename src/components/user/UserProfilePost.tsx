import { List } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { FeedPost } from "../post";

const UserProfilePost = () => {
    const response = useAppSelector((state) => state.feedPost);

    const listProfilePost = response.map((items, index) => 
    <FeedPost key={index} items={items} />
    )

    return(
        <List sx={{ width: '100%' }}>
            {listProfilePost}
        </List>
    )
}

export default UserProfilePost;