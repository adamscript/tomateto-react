import { useEffect, useRef, useState } from "react";

import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

import data from '@emoji-mart/data';
import { Picker } from 'emoji-mart';
import { Box, IconButton, Popover, styled, SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";
import { useAppSelector } from "../../app/hooks";

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.text.secondary,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

const EmojiDrawer = styled(SwipeableDrawer)(({ theme }) => ({
     '& .MuiBackdrop-root': {
        backgroundColor: 'transparent'
     }
})) as typeof SwipeableDrawer;

const PageEmojiButton = (props:any) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const ref = useRef(null);

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const darkMode = useAppSelector((state) => state.darkMode.value);

    useEffect(() => {
        new Picker({ ...props, data, ref })
    }, [])

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        setAnchorEl(e.currentTarget);
        
        const emojiPickerElements = document.getElementsByTagName("em-emoji-picker");

        for(let i = 0; i < emojiPickerElements.length; i++){
            emojiPickerElements[i].shadowRoot?.children[0].setAttribute("data-theme", darkMode ? "dark" : "light");
        }
    }

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    }

    return(
        <Box>
            <IconButton onClick={handleOpen} disabled={props.disabled}>
                <EmojiEmotionsOutlinedIcon />
            </IconButton>
            {
                !smDown ?
                <Popover disablePortal keepMounted anchorEl={anchorEl} open={ smDown ? false : open } onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                    <div ref={ref} />
                </Popover> :
                <EmojiDrawer disablePortal keepMounted anchor="bottom" open={ smDown ? open : false} onOpen={handleOpen} onClose={handleClose} disableSwipeToOpen>
                    <Box sx={{ height: 12, backgroundColor: 'transparent' }}>
                        <Puller />
                    </Box>
                    <Box sx={{ pt: 1 }}>
                        <div ref={ref} />
                    </Box>
                </EmojiDrawer>
            }
        </Box>
    )
}

export default PageEmojiButton;