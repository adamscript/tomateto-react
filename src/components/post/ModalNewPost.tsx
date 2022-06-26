import { Box, Card, IconButton, Modal } from "@mui/material";
import NewPost from "./NewPost";

import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const ModalNewPost = () => {
    const [isOpen, setOpen] = useState(true);
    console.log("is open" + isOpen)

    return(
        <Modal
        open={isOpen} 
        onClose={ () => setOpen(false) }
        sx={{ display: "flex",
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