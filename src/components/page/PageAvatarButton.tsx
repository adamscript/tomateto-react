import styled from "@emotion/styled";
import { Avatar, ButtonBase } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../features/utility/types";

const AvatarButton = styled(Avatar)(({ theme }) => ({
    '&:hover': {
        opacity: 0.9
    }
})) as typeof Avatar;

interface PageAvatarButtonProps {
    items: User;
}

const PageAvatarButton = (props: PageAvatarButtonProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <AvatarButton component={ButtonBase} sx={{ zIndex: 1 }} onClick={ () => { navigate(`/${props.items.username}`, { state: { location: location } }) } } src={props.items.avatar?.small} />
    )
}

export default PageAvatarButton;