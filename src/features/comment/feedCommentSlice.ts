import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface Comment{
    id: number;
    user: User;
    post: number;
    content: String;
    date: String;
    likesCount: number;
    isLiked: boolean;
    isMine: boolean;
}

const initialState: Comment[] = [];

export const feedCommentSlice = createSlice({
    name: 'feedComment',
    initialState,
    reducers: {
        insertComment(state, action: PayloadAction<Comment>) {
            state.unshift(action.payload);
        },
        likeComment(state, action: PayloadAction<Comment>){
            state[state.map(comment => comment.id).indexOf(action.payload.id)].likesCount += 1;
            state[state.map(comment => comment.id).indexOf(action.payload.id)].isLiked = true;
        },
        unlikeComment(state, action: PayloadAction<Comment>){
            state[state.map(comment => comment.id).indexOf(action.payload.id)].likesCount -= 1;
            state[state.map(comment => comment.id).indexOf(action.payload.id)].isLiked = false;
        },
        deleteComment(state, action: PayloadAction<Comment>){
            state.splice(state.map(comment => comment.id).indexOf(action.payload.id), 1);
        },
        loadComments(state, action: PayloadAction<Comment[]>) {
            state.length = 0;

            for(let i = 0; i < action.payload.length; i++){
                state.push(action.payload[i]);
            }
        }
    }
})

export const { loadComments, insertComment, likeComment, unlikeComment, deleteComment } = feedCommentSlice.actions;

export default feedCommentSlice.reducer;