import { Box, IconButton, Dialog } from "@mui/material";
import NewPost from "./NewPost";

import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const ModalNewPost = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    }

    return(
        <Box>
            <Dialog open onClose={handleClose} fullWidth maxWidth="sm"
                PaperProps={{ sx: { position: "absolute", top: 60 } }}>
                <Box>
                    <Box sx={{ pt: 1, pl: 1 }}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <NewPost />
                </Box>
            </Dialog>
        </Box>
    )
}

export default ModalNewPost;