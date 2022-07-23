import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { FeedPost } from "../post";

const UserProfileLiked = (props: any) => {
    const [isLoaded, setLoaded] = useState(true);
    const response = useAppSelector((state) => state.feedPost);

    const listProfileLiked = response.map((items, index) => 
    <FeedPost key={index} items={items} />
    )

    return(
        <List sx={{ width: '100%' }}>
            {listProfileLiked}
        </List>
    )
}

export default UserProfileLiked;