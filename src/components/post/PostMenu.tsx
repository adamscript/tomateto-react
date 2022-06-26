import { IconButton, Menu, MenuList, MenuItem, ListItemIcon, ListItemText, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Stack, Button, Modal, Box, Typography, Card, CardContent, InputBase, Avatar, LinearProgress } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { deletePost, editPost } from "../../features/post/feedPostSlice";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { auth } from "../../firebase";

interface User{
    id: String;
    displayName: String;
    username: String;
    avatar: String;
}

interface Post{
    id: number;
    user: User;
    content: String;
    photo: String;
    date: String;
    likesCount: number;
    commentsCount: number;
    isEdited: boolean;
    isLiked: boolean;
    isMine: boolean;
}

const PostMenu = (props: any) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const [editPostOpen, setEditPostOpen] = useState(false);
    const [editContent, setEditContent] = useState(String);
    const [isEditSaving, setEditSaving] = useState(false);

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const dispatch = useAppDispatch();

    const handleMenu = (e: any) => {
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

    const editedPost: Post ={
        id: props.items.id,
        user: {
            id: props.items.user.id,
            displayName: props.items.user.displayName,
            username: props.items.user.username,
            avatar: props.items.user.avatar
        },
        content: editContent,
        photo: props.items.photo,
        date: props.items.date,
        likesCount: props.items.likesCount,
        commentsCount: props.items.commentsCount,
        isEdited: true,
        isLiked: props.items.isLiked,
        isMine: props.items.isMine,
    }

    const handleEdit = () => {
        setEditSaving(true);

        function fetchEditPost(res: String){
            fetch('http://localhost:8080/api/post', {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`},
                    body: JSON.stringify({
                        'id': editedPost.id,
                        'content': editedPost.content
                    })
                })
            .then((res) => {
                setEditPostOpen(false);
                setEditSaving(false);
                dispatch(editPost(editedPost));
            })
        }
        
        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchEditPost(res);
        })
    }

    const handleEditPostOpen = () => {
        setEditContent("");
        setMenuOpen(false);
        setEditPostOpen(true);
    }

    const handleEditPostClose = () => {
        setEditPostOpen(false);
        setMenuOpen(true);
    }

    const handleDelete = () => {
        function fetchDeletePost(res: String){
            fetch(`http://localhost:8080/api/post/${props.items.id}/delete`, {
                    mode: 'cors',
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .then((res) => {
                setDeleteAlertOpen(false);
                dispatch(deletePost(props.items));
            })
        }
        
        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchDeletePost(res);
        })
    }

    const handleDeleteAlertOpen = () => {
        setDeleteAlertOpen(true);
        setMenuOpen(false);
    };

    const handleDeleteAlertClose = () => {
        setDeleteAlertOpen(false)
        setMenuOpen(true);
    };

    return(
            <><IconButton onClick={handleMenu}>
                <MoreHorizIcon />
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
                <MenuList  sx={{ width: 240 }}>
                    <MenuItem onClick={handleEditPostOpen}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText>Edit post</ListItemText>
                    </MenuItem>
                    <Divider />
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
                    Delete Post?
                </DialogTitle>
                <DialogContent>
                    This can't be undone and it will be removed from your profile, the timeline of any tomates that follow you, and from Tomateto search results.
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Button variant="text" onClick={handleDeleteAlertClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleDelete}>Delete</Button>
                    </Stack>
                </DialogActions>
            </Dialog>

            <Modal open={editPostOpen} onClose={handleEditPostClose}
                    sx={{ display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center"}}>
                <Box sx={{ position: "relative",
                        top: "90px",
                        width: "600px",
                        backgroundColor: "white" }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton onClick={handleEditPostClose}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6">Edit Post</Typography>
                    </Stack>
                    { isEditSaving && <LinearProgress /> }
                    <Stack direction="row" spacing={1}>
                        <Avatar />
                        <Stack sx={{ width: "100%" }}>
                            <InputBase multiline fullWidth defaultValue={props.items.content} disabled={isEditSaving} onChange={ (e) => {setEditContent(e.target.value)} } placeholder="What's on your to-mind?" />
                            <Stack direction="row" justifyContent="space-between">
                                <IconButton disabled={isEditSaving}>
                                    <EmojiEmotionsOutlinedIcon />
                                </IconButton>
                                <Button onClick={handleEdit} variant="contained" disabled={ editContent == "" || isEditSaving }>Save</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Modal></>
    )
}

export default PostMenu;