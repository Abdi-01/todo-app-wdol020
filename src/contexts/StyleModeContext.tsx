"use client";
import { setSignIn } from "@/lib/redux/features/authSlice";
import { useAppDispatch } from "@/lib/redux/hook";
import { apiCall } from "@/utils/apiHelper";
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

    const keepSignIn = async (): Promise<void> => {
        try {
            const dataLocal = localStorage.getItem("auth");
            if (dataLocal) {

                // 1. Mengambil data user ulang ke API
                // 2. Filtering data ke API by objectId
                const response = await apiCall.get("/api/data/account", {
                    params: {
                        where: `objectId = '${JSON.parse(dataLocal).objectId}'`
                    }
                });
                // 3. Simpan data response ke global state redux
                dispatch(setSignIn({
                    firstname: response.data[0].firstname,
                    lastname: response.data[0].lastname,
                    email: response.data[0].email,
                    objectId: response.data[0].objectId,
                }))
                // 4. Simpan ulang data ke local storage
                localStorage.setItem("auth", JSON.stringify({
                    firstname: response.data[0].firstname,
                    lastname: response.data[0].lastname,
                    email: response.data[0].email,
                    objectId: response.data[0].objectId,
                }))

                // dispatch(setSignIn(JSON.parse(dataLocal)));
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