import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utility/types";

interface UserRaw{
    id: string;
    displayName: string;
    username: string;
    avatarDefault?: string;
    avatarMedium?: string;
    avatarSmall?: string;
    avatarExtrasmall?: string;
    bio?: string;
    followCount?: number;
    followersCount?: number;
    postsCount?: number;
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
                                postsCount: 0,
                                isMine: true
                            };

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers:{
        setCurrentUser(state, action){
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