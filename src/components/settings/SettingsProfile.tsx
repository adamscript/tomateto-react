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

import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from "../../firebase";
import { TransitionProps } from '@mui/material/transitions';
import { resizePhoto } from '../../features/utility';
import { openSnackbarError, openSnackbarInfo } from '../../features/app/snackbarSlice';

interface Avatar{
    default: string;
    medium: string;
    small: string;
    extraSmall: string;
}

interface User{
    id: string;
    displayName: string;
    username: string;
    avatar: Avatar;
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

    const [isSaving, setSaving] = useState(false);
    const [errorText, setErrorText] = useState('');
    
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
        avatar: {
            default: currentUser.avatar.default,
            medium: currentUser.avatar.medium,
            small: currentUser.avatar.small,
            extraSmall: currentUser.avatar.extraSmall
        },
        bio: bioInput,
        followCount: currentUser.followCount,
        followersCount: currentUser.followersCount,
        postsCount: currentUser.postsCount
    }

    const handleEdit = () => {
        let uploadedPhotoList: number[] = [];

        function getPhotoURL(photoUploadRef: any, dimension: number){
            getDownloadURL(photoUploadRef)
                .then((url) => {
                    console.log(url)
                    if(dimension == 270){
                        editedUser.avatar.default = url;
                        uploadedPhotoList.push(dimension);
                    }
                    else if(dimension == 160){
                        editedUser.avatar.medium = url;
                        uploadedPhotoList.push(dimension);
                    }
                    else if(dimension == 96){
                        editedUser.avatar.small = url;
                        uploadedPhotoList.push(dimension);
                    }
                    else if(dimension == 64){
                        editedUser.avatar.extraSmall = url;
                        uploadedPhotoList.push(dimension);
                    }

                    if(uploadedPhotoList.length == 4){
                        fetchEditUser();
                    }
                })
        }

        function fetchEditUser(){
            uploadedPhotoList.length = 0;

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
                        avatarDefault: editedUser.avatar.default,
                        avatarMedium: editedUser.avatar.medium,
                        avatarSmall: editedUser.avatar.small,
                        avatarExtrasmall: editedUser.avatar.extraSmall,
                    })
                })
                .then((res) => {
                    return res.json();
                })
                .then((res: any) => {
                    console.log(res)
                    if(!res.code){
                        handleEditSuccess();
                    }
                    else if(res.code == 101){
                        setSaving(false);
                        setErrorText("Username already in use.");
                    }
                    else{
                        dispatch(openSnackbarError(res.message));
                        setSaving(false);
                        setErrorText('');
                    }
                })
            })
        }

        function handleEditSuccess(){
            dispatch(setCurrentUser(editedUser));
            dispatch(openSnackbarInfo("Profile saved"))
            console.log(editedUser)

            setPhotoFile(null);
            setSaving(false)
            setErrorText('');
        }

        function uploadPhoto(photoFile: any, name: string, dimension: number){
            const photoUploadRef = ref(storage, `photo/${currentUser.id}/profile/${name}-${dimension}x${dimension}`);
            const metadata = {
                contentType: 'image/jpeg'
            };

            uploadBytes(photoUploadRef, photoFile, metadata)
            .then((snapshot) => {
                console.log("upload successful " + dimension)

                getPhotoURL(photoUploadRef, dimension);
            });
            
        }

        async function resizePhotos(){
            const photoFileName = uuid();
            const photoDimensionList = [270, 160, 96, 64];

            let resizedPhotoList: any = [];

            for(let dimension of photoDimensionList){
                const resizedPhoto = await resizePhoto(photoFile, dimension);
                resizedPhotoList.push({ blob: resizedPhoto, dimension: dimension })
            }

            if(resizedPhotoList.length == 4){
                resizedPhotoList.forEach((result: any) => {
                    console.log(result)
                    uploadPhoto(result.blob, photoFileName, result.dimension);
                })
            }
        }

        if(photoFile){
            setSaving(true);

            console.log("post with photo upload")
            resizePhotos();
        }
        else{
            setSaving(true);
            fetchEditUser();
        }
    } 

    useEffect(() => {
        setUsernameInput(currentUser.username);
        setNameInput(currentUser.displayName);
        setBioInput(currentUser.bio);
        setPhotoURLPreview(currentUser.avatar.default);
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
                        <Button onClick={handleEdit} disabled={ !usernameInput || !nameInput || isSaving ? true : false } variant={ smDown ? "text" : "contained" }>Save</Button>
                    </Stack>
                </Stack>
            }
            {isSaving && <LinearProgress />}
            <Stack spacing={2} padding={2} alignItems="center">
                    <label htmlFor="photo-input">
                        <Input ref={photoInputRef} accept="image/*" id="photo-input" type="file" onChange={handleImageChange} />
                        <IconButton component="span" disabled={isSaving} sx={{ width: 140, height: 140 }}>
                            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{ position: 'absolute', color: 'white', zIndex: 3 }}>
                                    <AddAPhotoOutlinedIcon fontSize='large' />
                                </Box>
                                <Box sx={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: 'rgba(0, 0, 0, 0.4)', zIndex: 2 }} />
                                <Avatar src={photoURLPreview} sx={{ width: 140, height: 140 }} />
                            </Box>
                        </IconButton>
                        
                    </label>
                <TextField fullWidth id="username-input" label="Username" value={usernameInput} onChange={ (e) => { setUsernameInput(e.target.value) } } error={ errorText ? true : false } helperText={errorText} disabled={isSaving} />
                <TextField fullWidth id="name-input" label="Name" value={nameInput} onChange={ (e) => { setNameInput(e.target.value) } } disabled={isSaving} />
                <TextField fullWidth multiline minRows={3} id="bio-input" label="Bio" value={bioInput} onChange={ (e) => { setBioInput(e.target.value) } } disabled={isSaving} />
                {
                    !props.modal &&
                    <><Divider sx={{ width: '100%' }} />
                    <Stack direction="row" sx={{ width: '100%' }} justifyContent="end">
                        <Button onClick={handleEdit} disabled={ !usernameInput || !nameInput || isSaving ? true : false } variant="contained">Save</Button>
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