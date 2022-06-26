import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: User = {id: "", displayName: "", username: "", avatar: "", bio: "", followCount: 0, followersCount: 0, postsCount: 0};

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers:{
        setCurrentUser(state, action: PayloadAction<User>){
            state.id = action.payload.id;
            state.displayName = action.payload.displayName;
            state.username = action.payload.username;
            state.avatar = action.payload.avatar;
            state.bio = action.payload.bio;
            state.followCount = action.payload.followCount;
            state.followersCount = action.payload.followersCount;
            state.postsCount = action.payload.postsCount;
        },
        deleteCurrentUser(state){
            state.id = "";
            state.displayName = "";
            state.username = "";
            state.avatar = "";
            state.bio = "";
            state.followCount = 0;
            state.followersCount = 0;
            state.postsCount = 0;
        }
    }
})

export const { setCurrentUser, deleteCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;