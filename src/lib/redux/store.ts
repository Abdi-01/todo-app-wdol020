import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "@/lib/redux/features/authSlice";
import styleModeReducer from "@/lib/redux/features/styleModeSlice";
export const store = configureStore({
    reducer: {
        // define reducer config
        authUserReducer,
        styleModeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>; // type untuk mendefinisikan struktur data yang tersimpan didalam global store/state
export type AppDispatch = typeof store.dispatch; // type untuk mendefinisikan struktur data yang akan disimpan pada reducer.