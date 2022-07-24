import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { Comment } from "../comment";

const UserProfileComment = () => {
    const response = useAppSelector((state) => state.feedComment);

    const listProfileComment = response.map((items, index) => 
    <Comment key={index} items={items} />
    )

    return(
        <List sx={{ width: '100%' }}>
            {listProfileComment}
        </List>
    )
}

export default UserProfileComment;