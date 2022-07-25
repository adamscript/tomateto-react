import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface snackbarState {
    snackbarOpen: boolean;
    snackbarMessage: string;
    snackbarSeverity: string;
}

const initialState: snackbarState = { snackbarOpen: false, snackbarMessage: '', snackbarSeverity: 'info' };

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers:{
        openSnackbarInfo(state, action: PayloadAction<string>){
            state.snackbarOpen = true;
            state.snackbarMessage = action.payload;
            state.snackbarSeverity = 'info';
        },
        openSnackbarWarning(state, action: PayloadAction<string>){
            state.snackbarOpen = true;
            state.snackbarMessage = action.payload;
            state.snackbarSeverity = 'warning';
        },
        openSnackbarError(state, action: PayloadAction<string>){
            state.snackbarOpen = true;
            state.snackbarMessage = action.payload;
            state.snackbarSeverity = 'error';
        },
        closeSnackbar(state){
            state.snackbarOpen = false;
        }
    }
})

export const { openSnackbarInfo, openSnackbarWarning, openSnackbarError, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;