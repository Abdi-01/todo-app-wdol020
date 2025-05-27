"use client";

import { createContext, FunctionComponent, ReactNode, useState } from "react";


export const StyleModeContext = createContext({
    mode: "",
    setMode: (mode: string) => { }
})

interface IStyleModeProps {
    children: ReactNode
}

const StyleModeProvider: FunctionComponent<IStyleModeProps> = (props) => {

    const [mode, setMode] = useState<string>("light");

    return <StyleModeContext.Provider value={{ mode, setMode }}>
        {props.children}
    </StyleModeContext.Provider>
};

export default StyleModeProvider;