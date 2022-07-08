import { Box, IconButton, Dialog, useMediaQuery, useTheme, Slide } from "@mui/material";
import NewPost from "./NewPost";

import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref } from "react";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ModalNewPost = () => {
    const navigate = useNavigate();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        navigate(-1);
    }

    return(
        <Box>
            <Dialog open fullScreen={ smDown ? true : false } onClose={handleClose} fullWidth maxWidth="sm"
                PaperProps={{ sx: { position: "absolute", top: smDown ? 0 : 60 } }}
                TransitionComponent={ smDown ? Transition : undefined }>
                <Box>
                    <Box sx={{ p: 1 }}>
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