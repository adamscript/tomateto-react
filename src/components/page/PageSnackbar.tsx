import { Alert, Slide, SlideProps, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { closeSnackbar } from "../../features/app/snackbarSlice";

function SlideUpTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

function SlideDownTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const PageSnackBar = () => {
    const dispatch = useDispatch();
    const { snackbarOpen, snackbarMessage, snackbarSeverity } = useAppSelector((state) => state.snackbar);

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        dispatch(closeSnackbar());
    }

    return(
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: smDown ? 'bottom' : 'top', horizontal: 'center' }}
            TransitionComponent={ smDown ? SlideUpTransition : SlideDownTransition }
            onClose={handleClose}
            sx={ !smDown ? { top: 30 } : { bottom: 140 } }
        >
            <Alert onClose={handleClose} severity={snackbarSeverity == 'info' ? 'info' : 'error'} variant="filled" sx={{ width: '100%' }}>{snackbarMessage}</Alert>
        </Snackbar>
    )
}

export default PageSnackBar;