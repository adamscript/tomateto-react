import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
    isLoggedIn: Boolean;
}

const initialState: authState = {
    isLoggedIn: false
};

export const authStateSlice = createSlice({
    name: 'authState',
    initialState,
    reducers:{
        setAuthState(state, action: PayloadAction<Boolean>){
            state.isLoggedIn = action.payload;
        }
    }
})

export const { setAuthState } = authStateSlice.actions;

export default authStateSlice.reducer;