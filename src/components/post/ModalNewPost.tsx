import { Box, Card, IconButton, Modal } from "@mui/material";
import NewPost from "./NewPost";

import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const ModalNewPost = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    }

    return(
        <Modal
        open
        onClose={handleClose}
        sx={{ display: "flex",
                alignItems: "flex-start",
                justifyContent: "center"}}>
            <Box sx={{ position: "relative",
                        top: "90px",
                        width: "600px",
                        backgroundColor: "white" }}>
                <Box>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <NewPost />
            </Box>
        </Modal>
    )
}

export default ModalNewPost;