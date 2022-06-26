import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { Comment } from "../comment";

const UserProfileComment = (props: any) => {
    const [isLoaded, setLoaded] = useState(true);
    const response = useAppSelector((state) => state.feedComment);

    const listProfileComment = response.map((items, index) => 
    <Comment key={index} items={items} />
    )

    return(
        isLoaded ?
        <List>
            {listProfileComment}
        </List>
        : <div>Loading...</div>
    )
}

export default UserProfileComment;