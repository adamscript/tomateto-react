import { Avatar, Box, Button, Dialog, IconButton, Modal, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { minHeight } from "@mui/system";

const ModalUserEdit = () => {
    return(
        <Dialog open={true} sx={{ display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"}}>
            <Box sx={{ width: "600px",
                        padding: "15px",
                        backgroundColor: "white" }}>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                        <Stack sx={{ width: "100%" }} direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5">Edit Profileee</Typography>
                            <Button variant="contained">Save</Button>
                        </Stack>
                    </Stack>
                    <Stack spacing={4} alignItems="center">
                        <Avatar sx={{ width: 135, height: 135 }} />
                        <TextField label="Name" sx={{ width: "100%" }} />
                        <TextField label="Bio" multiline rows={3} sx={{ width: "100%" }} />
                    </Stack>
                </Stack>
            </Box>
        </Dialog>
    )
}

export default ModalUserEdit;