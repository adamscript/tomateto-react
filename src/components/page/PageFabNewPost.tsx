import { Fab, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { useLocation, useNavigate } from "react-router-dom";

const StyledFab = styled(Fab)(({theme}) => ({
    position: 'fixed',
    bottom: 72,
    right: 16,

    [theme.breakpoints.up('sm')]: {
        display: 'none'
    }
})) as typeof Fab;

const PageFabNewPost = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNewPost = () => {
        navigate('/compose/post', { state: {
          backgroundLocation: location
        } });
    }

    return(
        !location.pathname.includes("/settings") && !location.pathname.includes("/post/") ?
        <StyledFab onClick={handleNewPost} size="large" color="error">
            <AddCommentOutlinedIcon />
        </StyledFab> :
        <></>
    )
}

export default PageFabNewPost;