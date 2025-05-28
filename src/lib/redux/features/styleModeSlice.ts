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
        setMode: (state) => {
            if (state.mode === "light") {
                state.mode = "dark"
            } else {
                state.mode = "light"
            }
        }
    }
});

// action
export const { setMode } = styleModeSlice.actions;

// reducer
export default styleModeSlice.reducer;