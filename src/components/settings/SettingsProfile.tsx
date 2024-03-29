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

import { deleteObject, getDownloadURL, ref, StorageReference, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from "../../firebase";
import { TransitionProps } from '@mui/material/transitions';
import { resizePhoto } from '../../features/utility';
import { openSnackbarError, openSnackbarInfo } from '../../features/app/snackbarSlice';
import { Avatar as AvatarType, User } from '../../features/utility/types';
import insertErrorLog from '../../features/utility/errorLogging';

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

interface SettingsProfileProps {
    modal?: boolean;
}

const SettingsProfile = (props: SettingsProfileProps) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [bioInput, setBioInput] = useState<string | undefined>('');

    const [isSaving, setSaving] = useState(false);
    const [errorText, setErrorText] = useState('');
    
    let [photoFile, setPhotoFile] = useState<File | null >();
    let [photoURLPreview, setPhotoURLPreview] = useState<string | undefined>(String)
    let photoInputRef = useRef<HTMLInputElement>(null);
    
    const navigate = useNavigate();

    const currentUser = useAppSelector((state) => state.currentUser);
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        document.title = "Edit Profile - Tomateto";
    }, [])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setPhotoFile(e.target.files[0]);
            setPhotoURLPreview(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleCancelPhoto = () => {
        setPhotoURLPreview(""); 
        setPhotoFile(null);

        if(photoInputRef.current){
            photoInputRef.current.value = "";
        }
    }

    const editedUser: User = {
        id: currentUser.id,
        displayName: nameInput,
        username: usernameInput,
        avatar: {
            default: currentUser?.avatar?.default,
            medium: currentUser?.avatar?.medium,
            small: currentUser?.avatar?.small,
            extraSmall: currentUser?.avatar?.extraSmall
        },
        bio: bioInput,
        followCount: currentUser.followCount,
        followersCount: currentUser.followersCount,
        postsCount: currentUser.postsCount,
        isMine: true
    }

    const currentUserAvatar: AvatarType = {
        default: currentUser?.avatar?.default,
        medium: currentUser?.avatar?.medium,
        small: currentUser?.avatar?.small,
        extraSmall: currentUser?.avatar?.extraSmall
    }

    const handleEdit = () => {
        let uploadedPhotoList: number[] = [];

        function getPhotoURL(photoUploadRef: StorageReference, dimension: number){
            getDownloadURL(photoUploadRef)
                .then((url) => {
                    if(dimension == 270 && editedUser.avatar){
                        editedUser.avatar.default = url;
                        uploadedPhotoList.push(dimension);
                    }
                    else if(dimension == 160 && editedUser.avatar){
                        editedUser.avatar.medium = url;
                        uploadedPhotoList.push(dimension);
                    }
                    else if(dimension == 96 && editedUser.avatar){
                        editedUser.avatar.small = url;
                        uploadedPhotoList.push(dimension);
                    }
                    else if(dimension == 64 && editedUser.avatar){
                        editedUser.avatar.extraSmall = url;
                        uploadedPhotoList.push(dimension);
                    }

                    if(uploadedPhotoList.length == 4){
                        fetchEditUser();
                    }
                })
                .catch((err) => {
                    insertErrorLog("Get download URL for new User avatar / getPhotoURL / handleEdit / SettingsProfile", err);
                })
        }

        function fetchEditUser(){
            uploadedPhotoList.length = 0;

            auth.currentUser?.getIdToken()
            .then((res) => {
                fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`},
                    body: JSON.stringify({
                        username: editedUser.username,
                        displayName : editedUser.displayName,
                        bio : editedUser.bio,
                        avatarDefault: editedUser?.avatar?.default,
                        avatarMedium: editedUser?.avatar?.medium,
                        avatarSmall: editedUser?.avatar?.small,
                        avatarExtrasmall: editedUser?.avatar?.extraSmall,
                    })
                })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
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
                .catch((err) => {
                    setSaving(false);
                    dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                    insertErrorLog("Fetch Put User edit profile / fetchEditUser / handleEdit / SettingsProfile", err);
                })
            })
            .catch((err) => {
                setSaving(false);
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                insertErrorLog("Get Id token / fetchEditUser / handleEdit / SettingsProfile", err);
            })
        }

        function handleEditSuccess(){
            dispatch(setCurrentUser(editedUser));
            dispatch(openSnackbarInfo("Profile saved"))
            
            if(currentUserAvatar.default && photoFile){
                Object.values(currentUserAvatar).forEach(value => {
                    deletePhoto(value);
                });
            }

            setPhotoFile(null);
            setSaving(false)
            setErrorText('');

        }

        function uploadPhoto(photoFile: Blob, name: string, dimension: number){
            const photoUploadRef = ref(storage, `photo/${currentUser.id}/profile/${name}-${dimension}x${dimension}`);
            const metadata = {
                contentType: 'image/jpeg'
            };

            uploadBytes(photoUploadRef, photoFile, metadata)
            .then((snapshot) => {
                getPhotoURL(photoUploadRef, dimension);
            })
            .catch((err) => {
                setSaving(false);
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                insertErrorLog("Uploading avatar photo while editing User / uploadPhoto / handleEdit / SettingsProfile", err);
            })
            
        }

        async function resizePhotos(){
            const photoFileName = uuid();
            const photoDimensionList = [270, 160, 96, 64];

            let resizedPhotoList: { blob: Blob, dimension: number }[] = [];

            for(let dimension of photoDimensionList){
                if(photoFile){
                    const resizedPhoto = await resizePhoto(photoFile, dimension);
                    if(resizedPhoto instanceof Blob){
                        resizedPhotoList.push({ blob: resizedPhoto, dimension: dimension });
                    }
                }
            }

            if(resizedPhotoList.length == 4){
                resizedPhotoList.forEach((result: { blob: Blob, dimension: number }) => {
                    uploadPhoto(result.blob, photoFileName, result.dimension);
                })
            }
        }

        function deletePhoto(url: string){
            const photoRef = ref(storage, url);

            deleteObject(photoRef)
            .catch((err) => {
                insertErrorLog("Deleting photo after being changed in profile settings / deletePhoto / handleEdit / SettingsProfile");
            })
        }

        if(photoFile){
            setSaving(true);
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
        setPhotoURLPreview(currentUser?.avatar?.default);
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
                <TextField fullWidth id="username-input" label="Username" value={usernameInput} onChange={ (e) => { setUsernameInput(e.target.value) } } error={ errorText ? true : false } helperText={errorText} inputProps={{ maxLength: 20 }} disabled={isSaving} />
                <TextField fullWidth id="name-input" label="Name" value={nameInput} onChange={ (e) => { setNameInput(e.target.value) } } inputProps={{ maxLength: 60 }}  disabled={isSaving} />
                <TextField fullWidth multiline minRows={3} id="bio-input" label="Bio" value={bioInput} onChange={ (e) => { setBioInput(e.target.value) } } inputProps={{ maxLength: 300 }}  disabled={isSaving} />
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