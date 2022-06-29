import { Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from "react";

const PageShareButton = (props: any) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <MenuItem onClick={handleCopyLink}>
                        <ListItemIcon>
                            <LinkIcon />
                        </ListItemIcon>
                        <ListItemText>Copy link to post</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    )
}

export default PageShareButton;