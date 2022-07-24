import { Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, styled, SwipeableDrawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from "react";
import { Post } from "../../features/utility/types";

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.text.secondary,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

interface PageShareButtonProps {
    items: Post;
    content?: boolean;
}

const PageShareButton = (props: PageShareButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

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

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`https://tomateto.com/${props.items.user.username}/post/${props.items.id}`);
        setMenuOpen(false);
    };

    return(
        <Box>
            <IconButton size={ props.content ? "medium" : "small" } onClick={handleMenu}>
                <IosShareIcon fontSize="inherit" />
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
                    <MenuItem onClick={handleCopyLink}>
                        <ListItemIcon>
                            <LinkIcon />
                        </ListItemIcon>
                        <ListItemText>Copy link to post</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>

            <SwipeableDrawer anchor="bottom" open={ smDown ? menuOpen : false} onOpen={handleMenu} onClose={handleMenuClose} disableSwipeToOpen>
                <Box sx={{ height: 12, backgroundColor: 'transparent' }}>
                    <Puller />
                </Box>
                <List>
                    <Typography variant="h6" sx={{ p: 2, pt: 1 }}>Share Post</Typography>
                    <ListItem onClick={handleCopyLink}>
                        <ListItemIcon>
                                <LinkIcon />
                        </ListItemIcon>
                        <ListItemText>Copy link to post</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </Box>
    )
}

export default PageShareButton;