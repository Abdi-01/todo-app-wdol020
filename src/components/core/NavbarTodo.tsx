"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { StyleModeContext } from "@/contexts/StyleModeContext";

const NavbarTodo = () => {
    // Access global data from context
    const { mode, setMode } = useContext(StyleModeContext);

    return (
        <div
            className="w-full h-48 bg-cover bg-center relative"
            style={{
                backgroundImage: "url('/light-bg.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-transparent -z-40" />
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex justify-between w-[40rem]">
                <h1 className="text-4xl font-bold tracking-widest text-white">
                    Todo
                </h1>
                <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setMode(mode === "light" ? "dark" : "light")}
                >
                    {
                        mode === "light" ?
                            <Sun size={24} />
                            :
                            <Moon size={24} />
                    }
                </Button>
            </div>
        </div>

    );
};

export default NavbarTodo;
