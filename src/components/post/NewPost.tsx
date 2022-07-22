import { v4 as uuid } from 'uuid';

import { Avatar, Box, Button, Card, CardContent, CardMedia, Grid, IconButton, InputBase, LinearProgress, Stack, styled } from "@mui/material";

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { insertPost } from "../../features/post/feedPostSlice";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from '../../firebase';
import { PageEmojiButton } from '../page';
import { compressPhoto } from '../../features/utility';
import { openSnackbarInfo } from '../../features/app/snackbarSlice';
import { useLocation, useNavigate } from 'react-router-dom';

interface Avatar{
    default: string;
    medium: string;
    small: string;
    extraSmall: string;
}

interface User{
    id: String;
    displayName: String;
    username: String;
    avatar: Avatar;
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

const Input = styled('input')({
    display: 'none',
  });

const NewPost = () => {
    let [isPosting, setPosting] = useState(false);
    let [isUploading, setUploading] = useState(false);
    let [uploadProgress, setUploadProgress] = useState(0);

    let [content, setContent] = useState(String);
    let inputRef = useRef<HTMLInputElement>(null);

    let [photoFile, setPhotoFile] = useState<File | null>();
    let [photoURLPreview, setPhotoURLPreview] = useState(String)
    let photoInputRef = useRef<HTMLInputElement>(null);
    let photoRef = useRef<HTMLImageElement>(null);

    const location = useLocation();
    const navigate = useNavigate();

    const currentUser = useAppSelector((state) => state.currentUser);
    const dispatch = useAppDispatch();

    const handleImageChange = (e: any) => {
        setPhotoFile(e.target.files[0]);
        setPhotoURLPreview(URL.createObjectURL(e.target.files[0]));

        compressPhoto(photoFile).then((res) => { console.log(res) });
    }

    const handleCancelPhoto = () => {
        setPhotoURLPreview(""); 
        setPhotoFile(null);

        if(photoInputRef.current){
            photoInputRef.current.value = "";
        }
    }

    const newPost: Post = {
        id: 0,
        user: {
            id: currentUser.id,
            displayName: currentUser.displayName,
            username: currentUser.username,
            avatar: currentUser.avatar
        },
        content: content,
        photo: "",
        date: new Date().toISOString(),
        likesCount: 0,
        commentsCount: 0,
        isEdited: false,
        isLiked: false,
        isMine: true,
    }

    const handleEmojiSelect = (emoji: any) => {
        if(inputRef.current){
            setContent(inputRef.current.value + emoji.native);
        }
        else{
            //catch
        }
    }

    const handlePost = () => {

        function getPhotoURL(photoUploadRef: any){
            getDownloadURL(photoUploadRef)
                .then((url) => {
                    console.log(url)
                    newPost.photo = url;

                    fetchInsertPost();
                })
        }

        function fetchInsertPost(){
            auth.currentUser?.getIdToken()
            .then((res) => {
                fetch(`${process.env.REACT_APP_API_URL}/api/post`, {
                    mode: 'cors',
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res}`},
                    body: JSON.stringify({
                        content: newPost.content,
                        photo: newPost.photo
                    })
                })
                .then((res) => {
                    return res.json();
                })
                .then((res: any) => {
                    newPost.id = res.items.id;
                    handlePostSuccess();
                })
            })
        }

        function handlePostSuccess(){
            dispatch(insertPost(newPost));
            dispatch(openSnackbarInfo("Your post was sent"));
            console.log(newPost)

            setContent("");
            setPhotoURLPreview("");
            setPhotoFile(null);

            if(photoInputRef.current){
                photoInputRef.current.value = "";
            }

            if(location.pathname == '/compose/post'){
                navigate(-1);
            }
            
            setPosting(false)
        }

        function uploadPhoto(photoUploadRef: any, photoFile: any, metadata: any){
            uploadBytesResumable(photoUploadRef, photoFile, metadata)
            .on('state_changed', (snapshot) => {
                setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },
            (error) => {
                console.log(error)
            },
            () => {
                setUploading(false);
                setPosting(true);

                console.log("upload successful")

                getPhotoURL(photoUploadRef);
            })
        }

        if(photoFile){
            console.log("post with photo upload")
            setUploading(true)

            const photoUploadRef = ref(storage, `photo/${currentUser.id}/post/${uuid()}.jpg`);
            const metadata = {
                contentType: 'image/jpeg'
            };

            compressPhoto(photoFile)
            .then((res) => {
                uploadPhoto(photoUploadRef, res, metadata);
            })

        }
        else{
            setPosting(true)
            fetchInsertPost();
        }
    } 

    useEffect(() => {
        return () => URL.revokeObjectURL(photoURLPreview);
    }, [photoURLPreview])

    return(
        <Box>
            {isPosting && <LinearProgress />}
            {isUploading && <LinearProgress variant="determinate" value={uploadProgress} />}
            <Box sx={{ p: 2, pb: 1 }}>
            <Stack spacing={2} direction='row'>
                <Avatar src={currentUser.avatar.small} />
                <Stack sx={{ width: 1 }}>
                    <InputBase inputRef={inputRef} multiline fullWidth minRows={2} value={content} inputProps={{ maxLength: 8000 }} disabled={isPosting || isUploading} onChange={ (e) => {setContent(e.target.value)} } placeholder="What's on your to-mind?" />
                    {
                        photoURLPreview &&
                        <Box sx={{ position: 'relative', m: 1 }}>
                            <IconButton sx={{ position: 'absolute', top: 6, left: 6, color: 'white', background: 'rgba(125, 125, 125, 0.6)', '&:hover': { background: 'rgba(100, 100, 100, 0.6)' } }} onClick={handleCancelPhoto} size="small"><CloseIcon /></IconButton>
                            <CardMedia ref={photoRef} component="img" image={photoURLPreview} />
                        </Box>
                    }
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row">
                            <label htmlFor="photo-input">
                                <Input ref={photoInputRef} accept="image/*" id="photo-input" type="file" onChange={handleImageChange} />
                                <IconButton component="span" disabled={isPosting || isUploading}>
                                    <ImageOutlinedIcon />
                                </IconButton>
                            </label>
                            <PageEmojiButton onEmojiSelect={handleEmojiSelect} disabled={isPosting || isUploading} />
                        </Stack>
                        <Button onClick={handlePost} variant="contained" disabled={ content == "" || isPosting || isUploading }>Post</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
        </Box>
    )
};

export default NewPost;