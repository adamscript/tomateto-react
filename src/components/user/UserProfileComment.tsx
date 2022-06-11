import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { Comment } from "../comment";

const UserProfileComment = (props: any) => {
    const [response, setResponse] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const listProfileComment = response.map((items, index) => 
    <Comment key={index} items={items} />
    )

    useEffect(() => {

        fetch(`http://localhost:8080/api/user/profile/${props.id}/comments`, { mode: 'cors' })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            setResponse(res.items);
            setLoaded(true);
        })

    }, [])

    return(
        isLoaded ?
        <List>
            {listProfileComment}
        </List>
        : <div>Loading...</div>
    )
}

export default UserProfileComment;