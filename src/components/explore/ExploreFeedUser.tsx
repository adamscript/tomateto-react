import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { UserRecommendation } from "../user";

const ExploreFeedUser = (props: any) => {
    const [response, setResponse] = useState([]);

    const listFeedPost = response.slice(0, props.top ? 3 : response.length).map((items, index) => 
        <UserRecommendation key={index} items={items} />
    )

    useEffect(() => {

        fetch("http://localhost:8080/api/user/explore", { mode: 'cors' })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            setResponse(res.items);
        })

    }, [])

    return(
        <Stack>
            {listFeedPost}
        </Stack>
    )
}

export default ExploreFeedUser;