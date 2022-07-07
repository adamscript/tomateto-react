import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: User = {
                                id: "", 
                                displayName: "", 
                                username: "", 
                                avatar: {
                                    default: "",
                                    medium: "",
                                    small: "",
                                    extraSmall: ""
                                }, 
                                bio: "", 
                                followCount: 0, 
                                followersCount: 0, 
                                postsCount: 0
                            };

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers:{
        setCurrentUser(state, action: any){
            state.id = action.payload.id;
            state.displayName = action.payload.displayName;
            state.username = action.payload.username;
            state.avatar = {
                default: action.payload.avatar ? action.payload.avatar.default : action.payload.avatarDefault,
                medium:  action.payload.avatar ?  action.payload.avatar.medium : action.payload.avatarMedium,
                small: action.payload.avatar ? action.payload.avatar.small : action.payload.avatarSmall,
                extraSmall: action.payload.avatar ? action.payload.avatar.extraSmall : action.payload.avatarExtrasmall,
            };
            state.bio = action.payload.bio;
            state.followCount = action.payload.followCount;
            state.followersCount = action.payload.followersCount;
            state.postsCount = action.payload.postsCount;
        },
        deleteCurrentUser(state){
            state.id = "";
            state.displayName = "";
            state.username = "";
            state.avatar = {
                default: "",
                medium: "",
                small: "",
                extraSmall: ""
            };
            state.bio = "";
            state.followCount = 0;
            state.followersCount = 0;
            state.postsCount = 0;
        }
    }
})

export const { setCurrentUser, deleteCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;