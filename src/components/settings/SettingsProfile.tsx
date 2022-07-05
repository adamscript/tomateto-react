import { v4 as uuid } from 'uuid';

import { Avatar, Button, Dialog, Divider, IconButton, LinearProgress, Slide, Stack, styled, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";

import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import { PageLabel } from "../page";

import { useNavigate } from "react-router-dom";
import { forwardRef, ReactElement, Ref, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentUser } from "../../features/user/currentUserSlice";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from "../../firebase";
import { TransitionProps } from '@mui/material/transitions';

interface User{
    id: string;
    displayName: string;
    username: string;
    avatar: string;
    bio: string;
    followCount: Number;
    followersCount: Number;
    postsCount: Number;
}

const Input = styled('input')({
    display: 'none',
  });

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SettingsProfile = (props: any) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [bioInput, setBioInput] = useState('');

    let [isSaving, setSaving] = useState(false);
    let [isUploading, setUploading] = useState(false);
    let [uploadProgress, setUploadProgress] = useState(0);
    
    let [photoFile, setPhotoFile] = useState<File | null>();
    let [photoURLPreview, setPhotoURLPreview] = useState(String)
    let photoInputRef = useRef<HTMLInputElement>(null);
    
    const navigate = useNavigate();

    const currentUser = useAppSelector((state) => state.currentUser);
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleImageChange = (e: any) => {
        setPhotoFile(e.target.files[0]);
        setPhotoURLPreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleCancelPhoto = () => {
        setPhotoURLPreview(""); 
        setPhotoFile(null);

        console.log(editedUser)

        if(photoInputRef.current){
            photoInputRef.current.value = "";
        }
    }

    const editedUser: User = {
        id: currentUser.id,
        displayName: nameInput,
        username: usernameInput,
        avatar: currentUser.avatar,
        bio: bioInput,
        followCount: currentUser.followCount,
        followersCount: currentUser.followersCount,
        postsCount: currentUser.postsCount
    }

    const handleEdit = () => {

        function getPhotoURL(photoUploadRef: any){
            getDownloadURL(photoUploadRef)
                .then((url) => {
                    console.log(url)
                    editedUser.avatar = url;

                    fetchEditUser();
                })
        }

        function fetchEditUser(){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetch('http://localhost:8080/api/user', {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`},
                    body: JSON.stringify({
                        username: editedUser.username,
                        displayName : editedUser.displayName,
                        bio : editedUser.bio,
                        avatar: editedUser.avatar
                    })
                })
                .then((res) => {
                    return res.json();
                })
                .then((res: any) => {
                    console.log(res)
                    handleEditSuccess();
                })
            })
        }

        function handleEditSuccess(){
            dispatch(setCurrentUser(editedUser));
            console.log(editedUser)

            setPhotoFile(null);
            
            setSaving(false)
        }

        if(photoFile){
            console.log("post with photo upload")
            setUploading(true)

            const photoUploadRef = ref(storage, `photo/${currentUser.id}/profile/${uuid()}.jpg`);
            const metadata = {
                contentType: 'image/jpeg'
            };

            uploadBytesResumable(photoUploadRef, photoFile, metadata)
            .on('state_changed', (snapshot) => {
                setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },
            (error) => {
                console.log(error)
            },
            () => {
                setUploading(false);
                setSaving(true);

                console.log("upload successful")

                getPhotoURL(photoUploadRef);
            })

        }
        else{
            setSaving(true)
            fetchEditUser();
        }
    } 

    useEffect(() => {
        setUsernameInput(currentUser.username);
        setNameInput(currentUser.displayName);
        setBioInput(currentUser.bio);
        setPhotoURLPreview(currentUser.avatar);
    }, [])

    return(
        <Box>
            {
                !props.modal ?
                <Stack spacing={2} direction="row" alignItems="center" sx={{ width: '100%' }}>
                    <IconButton onClick={ () => {navigate('..'); handleCancelPhoto();} }>
                        <ArrowBackIcon />
                    </IconButton>
                    <PageLabel>Edit Profile</PageLabel>
                </Stack>
                :
                <Stack spacing={1} direction="row" alignItems="center" sx={{ width: 'calc(100% - 20px)', pl: 1 }}>
                    <IconButton onClick={ () => {navigate(`/${currentUser.username}`); handleCancelPhoto();} }>
                        <CloseIcon />
                    </IconButton>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
                        <PageLabel>Edit Profile</PageLabel>
                        <Button onClick={handleEdit} disabled={ !usernameInput || !nameInput || isSaving || isUploading ? true : false } variant={ smDown ? "text" : "contained" }>Save</Button>
                    </Stack>
                </Stack>
            }
            {isSaving && <LinearProgress />}
            {isUploading && <LinearProgress variant="determinate" value={uploadProgress} />}
            <Stack spacing={2} padding={2} alignItems="center">
                    <label htmlFor="photo-input">
                        <Input ref={photoInputRef} accept="image/*" id="photo-input" type="file" onChange={handleImageChange} />
                        <IconButton component="span" disabled={isSaving || isUploading} sx={{ width: 140, height: 140 }}>
                            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{ position: 'absolute', color: 'white', zIndex: 3 }}>
                                    <AddAPhotoOutlinedIcon fontSize='large' />
                                </Box>
                                <Box sx={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: 'rgba(0, 0, 0, 0.4)', zIndex: 2 }} />
                                <Avatar src={photoURLPreview} sx={{ width: 140, height: 140 }} />
                            </Box>
                        </IconButton>
                        
                    </label>
                <TextField fullWidth id="username-input" label="Username" value={usernameInput} onChange={ (e) => { setUsernameInput(e.target.value) } } disabled={isSaving || isUploading} />
                <TextField fullWidth id="name-input" label="Name" value={nameInput} onChange={ (e) => { setNameInput(e.target.value) } } disabled={isSaving || isUploading} />
                <TextField fullWidth multiline minRows={3} id="bio-input" label="Bio" value={bioInput} onChange={ (e) => { setBioInput(e.target.value) } } disabled={isSaving || isUploading} />
                {
                    !props.modal &&
                    <><Divider sx={{ width: '100%' }} />
                    <Stack direction="row" sx={{ width: '100%' }} justifyContent="end">
                        <Button onClick={handleEdit} disabled={ !usernameInput || !nameInput || isSaving || isUploading ? true : false } variant="contained">Save</Button>
                    </Stack></>
                }
            </Stack>
        </Box>
    )
}

const SettingsProfileModal = () => {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate();
    
    const currentUser = useAppSelector((state) => state.currentUser);

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false);
        navigate(`/${currentUser.username}`);
    }

    return(
        <Box>
            <Dialog open={open} onClose={handleClose} fullScreen={ smDown && true } fullWidth maxWidth="sm"
                TransitionComponent={ smDown ? Transition : undefined }>
                <SettingsProfile modal />
            </Dialog>
        </Box>
    )
}

export { SettingsProfile, SettingsProfileModal };