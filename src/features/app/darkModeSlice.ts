import { createSlice } from "@reduxjs/toolkit";

interface darkModeState {
    value: boolean;
}

const initialState: darkModeState = { value: false };

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers:{
        setDarkMode(state){
            state.value = true;
        },
        setLightMode(state){
            state.value = false;
        }
    }
})

export const { setDarkMode, setLightMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;