"use client";
import { setSignIn } from "@/lib/redux/features/authSlice";
import { useAppDispatch } from "@/lib/redux/hook";
import { createContext, FunctionComponent, ReactNode, useEffect, useState } from "react";

export const StyleModeContext = createContext({
    mode: "",
    setMode: (mode: string) => { }
})

interface IStyleModeProps {
    children: ReactNode
}

const StyleModeProvider: FunctionComponent<IStyleModeProps> = (props) => {
    const dispatch = useAppDispatch();
    const [mode, setMode] = useState<string>("light");

    const keepSignIn = (): void => {
        try {
            const dataLocal = localStorage.getItem("auth");
            if (dataLocal) {
                dispatch(setSignIn(JSON.parse(dataLocal)));
            } else {
                throw new Error("Data invalid")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        keepSignIn();
    }, [])

    return <StyleModeContext.Provider value={{ mode, setMode }}>
        {props.children}
    </StyleModeContext.Provider>
};

export default StyleModeProvider;