import { v4 as uuid } from 'uuid';

import { Avatar, Box, Button, Card, CardContent, CardMedia, Grid, IconButton, InputBase, LinearProgress, Stack, styled } from "@mui/material";

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { insertPost } from "../../features/post/feedPostSlice";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from '../../firebase';

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

const Input = styled('input')({
    display: 'none',
  });

const NewPost = () => {
    let [isPosting, setPosting] = useState(false);
    let [isUploading, setUploading] = useState(false);
    let [uploadProgress, setUploadProgress] = useState(0);

    let [content, setContent] = useState(String);

    let [photoFile, setPhotoFile] = useState<File | null>();
    let [photoURLPreview, setPhotoURLPreview] = useState(String)
    let photoInputRef = useRef<HTMLInputElement>(null);

    const currentUser = useAppSelector((state) => state.currentUser);
    const dispatch = useAppDispatch();

    const handleImageChange = (e: any) => {
        setPhotoFile(e.target.files[0]);
        setPhotoURLPreview(URL.createObjectURL(e.target.files[0]));
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
        date: "",
        likesCount: 0,
        commentsCount: 0,
        isEdited: false,
        isLiked: false,
        isMine: true,
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
                fetch('http://localhost:8080/api/post', {
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
            console.log(newPost)

            setContent("");
            setPhotoURLPreview("");
            setPhotoFile(null);
            
            setPosting(false)
        }

        if(photoFile){
            console.log("post with photo upload")
            setUploading(true)

            const photoUploadRef = ref(storage, `photo/${currentUser.id}/post/${uuid()}.jpg`);
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
                setPosting(true);

                console.log("upload successful")

                getPhotoURL(photoUploadRef);
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
        <Box sx={{ p: 2, pb: 1 }}>
            {isPosting && <LinearProgress />}
            {isUploading && <LinearProgress variant="determinate" value={uploadProgress} />}
            <Stack spacing={2} direction='row'>
                <Avatar src={currentUser.avatar} />
                <Stack sx={{ width: 1 }}>
                    <InputBase multiline fullWidth minRows={2} value={content} disabled={isPosting || isUploading} onChange={ (e) => {setContent(e.target.value)} } placeholder="What's on your to-mind?" />
                    {
                        photoURLPreview &&
                        <><IconButton onClick={handleCancelPhoto}><CloseIcon /></IconButton>
                        <CardMedia component="img" image={photoURLPreview} /></>
                    }
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row">
                            <label htmlFor="photo-input">
                                <Input ref={photoInputRef} accept="image/*" id="photo-input" type="file" onChange={handleImageChange} />
                                <IconButton component="span" disabled={isPosting || isUploading}>
                                    <ImageOutlinedIcon />
                                </IconButton>
                            </label>
                            <IconButton disabled={isPosting || isUploading}>
                                <EmojiEmotionsOutlinedIcon />
                            </IconButton>
                        </Stack>
                        <Button onClick={handlePost} variant="contained" disabled={ content == "" || isPosting || isUploading }>Post</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
};

export default NewPost;