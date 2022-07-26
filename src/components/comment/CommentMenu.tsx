import { IconButton, Menu, MenuList, MenuItem, ListItemIcon, ListItemText, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Stack, Button, Modal, Box, Typography, Card, CardContent, InputBase, Avatar, ButtonBase, List, ListItem, styled, SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { decrementCommentsCount, deletePost, editPost } from "../../features/post/feedPostSlice";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { deleteComment } from "../../features/comment/feedCommentSlice";
import { auth } from "../../firebase";
import { Comment } from "../../features/utility/types";
import { openSnackbarError } from "../../features/app/snackbarSlice";
import insertErrorLog from "../../features/utility/errorLogging";

interface CommentMenuProps {
    items: Comment;
    area?: boolean;
}

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.text.secondary,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

const CommentMenu = (props: CommentMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const dispatch = useAppDispatch();

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

    const handleCopy = () => {
        navigator.clipboard.writeText(props.items.content);
        setMenuOpen(false);
    };

    const handleDelete = () => {
        setDeleteAlertOpen(false);

        dispatch(deleteComment(props.items));
        dispatch(decrementCommentsCount(props.items.post));

        function fetchDeleteComment(res: string){

            fetch(`${process.env.REACT_APP_API_URL}/api/comment/${props.items.id}/delete`, {
                    mode: 'cors',
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`}
                })
            .catch((err) => {
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                console.log(err)

                insertErrorLog("Fetch Delete Comment / handleDelete / CommentMenu", err);
            })
        }
        
        auth.currentUser?.getIdToken()
        .then((res) => {
            fetchDeleteComment(res);
        })
        .catch((err) => {
            dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
            insertErrorLog("Get id token / handleDelete / CommentMenu", err);
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
            <>
            {
                props.area ?
                <ButtonBase component={Box} onClick={handleMenu} sx={{ position: 'absolute', top: 0, width: '100%', height: '100%', background: menuOpen ? 'rgba(125, 125, 125, 0.2)' : 'rgba(0, 0, 0, 0)' }} /> :
                <IconButton onClick={handleMenu} size="small">
                    <MoreHorizIcon fontSize="inherit" />
                </IconButton>
            }
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

            <SwipeableDrawer anchor="bottom" open={ smDown ? menuOpen : false} onOpen={handleMenu} onClose={handleMenuClose} disableSwipeToOpen>
                <Box sx={{ height: 12, backgroundColor: 'transparent' }}>
                    <Puller />
                </Box>
                <List>
                    <ListItem onClick={handleCopy}>
                        <ListItemIcon>
                            <ContentCopyIcon />
                        </ListItemIcon>
                        <ListItemText>Copy to clipboard</ListItemText>
                    </ListItem>
                    {
                        props.items.isMine &&
                        <ListItem onClick={handleDeleteAlertOpen}>
                            <ListItemIcon sx={{ color: "red" }}>
                                <DeleteOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ color: "red" }}>Delete</ListItemText>
                        </ListItem>
                    }
                </List>
            </SwipeableDrawer>
        
            <Dialog open={deleteAlertOpen} onClose={handleDeleteAlertClose}>
                <DialogTitle>
                    Delete Comment?
                </DialogTitle>
                <DialogContent>
                    This can't be undone.
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Button variant="text" sx={{ color: theme => theme.palette.text.primary }} onClick={handleDeleteAlertClose}>Cancel</Button>
                        <Button variant={ smDown ? "text" : "contained" } color="error" onClick={handleDelete}>Delete</Button>
                    </Stack>
                </DialogActions>
            </Dialog></>
    )
}

export default CommentMenu;