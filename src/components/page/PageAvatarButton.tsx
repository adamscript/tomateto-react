import styled from "@emotion/styled";
import { Avatar, ButtonBase } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const AvatarButton = styled(Avatar)(({ theme }) => ({
    '&:hover': {
        opacity: 0.9
    }
})) as typeof Avatar;

const PageAvatarButton = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <AvatarButton component={ButtonBase} sx={{ zIndex: 1 }} onClick={ () => { navigate(`/${props.items.username}`, { state: { location: location } }) } } src={props.items.avatar.small} />
    )
}

export default PageAvatarButton;