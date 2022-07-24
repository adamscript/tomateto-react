import { IconButton, Menu, MenuList, MenuItem, ListItemIcon, ListItemText, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Stack, Button, Modal, Box, Typography, Card, CardContent, InputBase, Avatar, LinearProgress, useMediaQuery, useTheme, Drawer, List, ListItem, SwipeableDrawer, styled, Slide } from "@mui/material";
import { forwardRef, ReactElement, Ref, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { deletePost, editPost } from "../../features/post/feedPostSlice";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { auth } from "../../firebase";
import { TransitionProps } from "@mui/material/transitions";
import { PageEmojiButton } from "../page";
import { openSnackbarInfo } from "../../features/app/snackbarSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { Post } from "../../features/utility/types";

const storage = getStorage();

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.text.secondary,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

interface PostMenuProps {
    items: Post;
}

const PostMenu = (props: PostMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const [editPostOpen, setEditPostOpen] = useState(false);
    const [editContent, setEditContent] = useState(String);
    const [isEditSaving, setEditSaving] = useState(false);

    let inputRef = useRef<HTMLInputElement>(null);

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const dispatch = useAppDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
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
            avatar: props.items.user.avatar,
            followCount: props.items.user.followCount,
            followersCount: props.items.user.followersCount,
            postsCount: props.items.user.postsCount,
            isMine: props.items.user.isMine
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

        function fetchEditPost(res: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/post`, {
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

    const handleEmojiSelect = (emoji: any) => {
        if(inputRef.current){
            inputRef.current.value = inputRef.current.value + emoji.native;
            setEditContent(inputRef.current.value + emoji.native);
        }
    }

    const handleDelete = () => {
        function fetchDeletePost(res: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/post/${props.items.id}/delete`, {
                    mode: 'cors',
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .then((res) => {
                setDeleteAlertOpen(false);

                if(location.pathname.includes('/post/')){
                    navigate('/');
                }

                dispatch(deletePost(props.items));
                dispatch(openSnackbarInfo("Your post was deleted"));

                if(props.items.photo){
                    deletePhoto();
                }
            })
        }

        function deletePhoto(){
            const photoRef = ref(storage, props.items.photo);

            deleteObject(photoRef)
            .then((res) => {
                //success
                console.log('post photo deleted successfully')
            })
            .catch((err) => {
                //error
                console.log('photo deletion failed')
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
            <><IconButton onClick={handleMenu} size="small">
                { smDown ? <MoreVertIcon /> : <MoreHorizIcon /> }
            </IconButton>
            <Menu anchorEl={anchorEl} 
                    open={ smDown ? false : menuOpen } 
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
                            right: 12,
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

            <SwipeableDrawer anchor="bottom" open={ smDown ? menuOpen : false} onOpen={handleMenu} onClose={handleMenuClose} disableSwipeToOpen>
                <Box sx={{ height: 12, backgroundColor: 'transparent' }}>
                    <Puller />
                </Box>
                <List>
                    <ListItem onClick={handleEditPostOpen}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText>Edit post</ListItemText>
                    </ListItem>
                    <ListItem onClick={handleDeleteAlertOpen}>
                        <ListItemIcon sx={{ color: "red" }}>
                            <DeleteOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ color: "red" }}>Delete</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        
            <Dialog open={deleteAlertOpen} onClose={handleDeleteAlertClose}>
                <DialogTitle>
                    Delete Post?
                </DialogTitle>
                <DialogContent>
                    This can't be undone and it will be removed from your profile, the timeline of any tomates that follow you, and from Tomateto search results.
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Button variant="text" sx={{ color: theme => theme.palette.text.primary }} onClick={handleDeleteAlertClose}>Cancel</Button>
                        <Button variant={ smDown ? "text" : "contained" } color="error" onClick={handleDelete}>Delete</Button>
                    </Stack>
                </DialogActions>
            </Dialog>

            <Dialog open={editPostOpen} fullScreen={ smDown ? true : false } onClose={handleEditPostClose} fullWidth maxWidth="sm"
                PaperProps={{ sx: { position: "absolute", top: smDown ? 0 : 60 } }}
                TransitionComponent={ smDown ? Transition : undefined }>
                <Box>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 1 }}>
                        <IconButton onClick={handleEditPostClose}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6">Edit Post</Typography>
                    </Stack>
                    { isEditSaving && <LinearProgress /> }
                    <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                        <Avatar />
                        <Stack sx={{ width: "100%" }}>
                            <InputBase inputRef={inputRef} autoFocus multiline fullWidth minRows={2} defaultValue={props.items.content} inputProps={{ maxLength: 8000 }} disabled={isEditSaving} onChange={ (e) => {setEditContent(e.target.value)} } placeholder="What's on your to-mind?" />
                            <Stack direction="row" justifyContent={ smDown ? "end" : "space-between" }>
                                {
                                    !smDown &&
                                    <PageEmojiButton onEmojiSelect={handleEmojiSelect} disabled={isEditSaving} />
                                }
                                <Button onClick={handleEdit} variant="contained" disabled={ editContent == "" || isEditSaving }>Save</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Dialog></>
    )
}

export default PostMenu;