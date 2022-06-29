import styled from "@emotion/styled";
import { Avatar, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AvatarButton = styled(Avatar)(({ theme }) => ({
    '&:hover': {
        opacity: 0.9
    }
})) as typeof Avatar;

const PageAvatarButton = (props: any) => {
    const navigate = useNavigate();

    return(
        <AvatarButton component={ButtonBase} onClick={ () => { navigate(`/${props.items.username}`) } } src={props.items.avatar} />
    )
}

export default PageAvatarButton;