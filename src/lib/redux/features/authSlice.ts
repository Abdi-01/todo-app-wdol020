import { createSlice } from "@reduxjs/toolkit";

interface IAuthUser {
    firstname: string;
    lastname: string;
    email: string;
    objectId: string; // sementara sebagai pengganti data token
}

const initialState: IAuthUser = {
    firstname: "",
    lastname: "",
    email: "",
    objectId: "",
}

const authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            console.log("CHECK DATA FROM UI to REDUCER", action.payload);

            return action.payload;
        },
        setSignOut: () => {
            return initialState;
        }
    }
})

export const { setSignIn, setSignOut } = authUserSlice.actions;

export default authUserSlice.reducer;