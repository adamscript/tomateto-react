import { Box, Card, IconButton, Modal } from "@mui/material";
import NewPost from "./NewPost";

import CloseIcon from '@mui/icons-material/Close';

const ModalNewPost = () => {
    return(
        <Modal open={true} sx={{ display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "center"}}>
            <Box sx={{ position: "relative",
                        top: "90px",
                        width: "600px",
                        backgroundColor: "white" }}>
                <Box>
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <NewPost />
            </Box>
        </Modal>
    )
}

export default ModalNewPost;