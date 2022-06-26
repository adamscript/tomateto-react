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
        isLoaded ?
        <List>
            {listProfileLiked}
        </List>
        : <div>Loading...</div>
    )
}

export default UserProfileLiked;