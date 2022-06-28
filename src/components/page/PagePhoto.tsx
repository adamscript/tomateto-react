import { CardActionArea, CardMedia, Container, Dialog, IconButton, LinearProgress, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

const PagePhoto = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(`/${props.items.user.username}/post/${props.items.id}/photo`, {
            state: {
                backgroundLocation: location,
                photo: props.items.photo
            }
        });
    }

    return(
        <CardActionArea onClick={handleClick}>
            <CardMedia component="img" image={props.items.photo} />
        </CardActionArea>
    )
}

const PagePhotoModal = () => {
    const [photo, setPhoto] = useState<string>();

    const navigate = useNavigate();
    const { postId } = useParams();
    const location = useLocation();
    const locationState = location.state as { photo: string; };

    const handleClose = () => {
        locationState ? navigate(-1) : navigate('..');
    }


    useEffect(() => {
        function fetchPostPhoto(){
            fetch(`http://localhost:8080/api/post/content/${postId}/`, {
                mode: 'cors'
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setPhoto(res.items.photo);
            })
        }

        if(locationState){
            setPhoto(locationState.photo);
        }
        else{
            fetchPostPhoto();
        }
        
    },[]);

    return(
        <Box>
            <Modal sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }} 
                    open 
                    onClose={handleClose}>
                    <><IconButton sx={{
                        position: 'fixed',
                        left: '10px',
                        top: '10px',
                        color: 'white',
                        background: 'rgba(125, 125, 125, 0.5)'
                    }}
                    onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{
                            maxHeight: 1,
                            maxWidth: 1
                        }}
                        component="img"
                        src={photo}
                    /></>
            </Modal>
        </Box>
    )
}

export { PagePhoto, PagePhotoModal };