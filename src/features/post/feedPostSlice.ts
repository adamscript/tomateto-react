import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: Post[] = [];

export const feedPostSlice = createSlice({
    name: 'feedPost',
    initialState,
    reducers: {
        insertPost(state, action: PayloadAction<Post>) {
            state.unshift(action.payload);
        },
        editPost(state, action: PayloadAction<Post>){
            state[state.map(post => post.id).indexOf(action.payload.id)].content = action.payload.content;
            state[state.map(post => post.id).indexOf(action.payload.id)].isEdited = true;
        },
        likePost(state, action: PayloadAction<Post>){
            state[state.map(post => post.id).indexOf(action.payload.id)].likesCount += 1;
            state[state.map(post => post.id).indexOf(action.payload.id)].isLiked = true;
        },
        unlikePost(state, action: PayloadAction<Post>){
            state[state.map(post => post.id).indexOf(action.payload.id)].likesCount -= 1;
            state[state.map(post => post.id).indexOf(action.payload.id)].isLiked = false;
        },
        deletePost(state, action: PayloadAction<Post>){
            state.splice(state.map(post => post.id).indexOf(action.payload.id), 1);
        },
        loadPosts(state, action: PayloadAction<Post[]>) {
            state.length = 0;

            for(let i = 0; i < action.payload.length; i++){
                state.push(action.payload[i]);
            }
        },
        incrementCommentsCount(state, action: PayloadAction<number>){
            state[state.map(post => post.id).indexOf(action.payload)].commentsCount += 1;
        },
        decrementCommentsCount(state, action: PayloadAction<number>){
            state[state.map(post => post.id).indexOf(action.payload)].commentsCount -= 1;
        }
    }
})

export const { loadPosts, insertPost, editPost, likePost, unlikePost, deletePost, incrementCommentsCount, decrementCommentsCount } = feedPostSlice.actions;

export default feedPostSlice.reducer;