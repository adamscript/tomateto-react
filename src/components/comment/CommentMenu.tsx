import { IconButton, Menu, MenuList, MenuItem, ListItemIcon, ListItemText, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Stack, Button, Modal, Box, Typography, Card, CardContent, InputBase, Avatar } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { decrementCommentsCount, deletePost, editPost } from "../../features/post/feedPostSlice";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { deleteComment } from "../../features/comment/feedCommentSlice";
import { auth } from "../../firebase";

const CommentMenu = (props: any) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const [editPostOpen, setEditPostOpen] = useState(false);
    const [editContent, setEditContent] = useState(props.items.Content);
    const [isEditSaving, setEditSaving] = useState(false);

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const dispatch = useAppDispatch();

    const handleMenu = (e: any) => {
        console.log(props.items.post)

        if(menuOpen){
            setMenuOpen(false);
            setAnchorEl(null);
        }
        else{
            setAnchorEl(e.currentTarget);
            setMenuOpen(true);
        }
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
        setAnchorEl(null);
    };

    const handleDelete = () => {
        function fetchDeleteComment(res: String){
            fetch(`http://localhost:8080/api/comment/${props.items.id}/delete`, {
                    mode: 'cors',
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .then((res) => {
                setDeleteAlertOpen(false);
                dispatch(deleteComment(props.items));
                dispatch(decrementCommentsCount(props.items.post));
            })
        }
        
        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchDeleteComment(res);
        })
    }

    const handleDeleteAlertOpen = () => {
        setDeleteAlertOpen(true);
        setMenuOpen(false);
    };

    const handleDeleteAlertClose = () => {
        setDeleteAlertOpen(false)
    };

    return(
            <><IconButton onClick={handleMenu} size="small">
                <MoreHorizIcon fontSize="inherit" />
            </IconButton>
            <Menu anchorEl={anchorEl} 
                    open={menuOpen} 
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 15,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}>
                <MenuList>
                    <MenuItem onClick={handleDeleteAlertOpen}>
                        <ListItemIcon sx={{ color: "red" }}>
                            <DeleteOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ color: "red" }}>Delete</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
        
            <Dialog open={deleteAlertOpen} onClose={handleDeleteAlertClose}>
                <DialogTitle>
                    Delete Comment?
                </DialogTitle>
                <DialogContent>
                    This can't be undone.
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Button variant="text" onClick={handleDeleteAlertClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleDelete}>Delete</Button>
                    </Stack>
                </DialogActions>
            </Dialog></>
    )
}

export default CommentMenu;