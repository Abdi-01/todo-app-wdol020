import { createSlice } from "@reduxjs/toolkit";

interface IStyleMode {
    mode: string
}

const initialState: IStyleMode = {
    mode: "light"
}

export const styleModeSlice = createSlice({
    name: "styleMode",
    initialState,
    reducers: {
        // define object methode for modify data in reducer
        setMode: (state, action) => {
            state.mode = action.payload;
        }
    }
});

// action
export const { setMode } = styleModeSlice.actions;

// reducer
export default styleModeSlice.reducer;