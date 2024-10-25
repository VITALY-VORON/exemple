"use client"

import { useNavigate } from "react-router-dom";


interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const AuthButton = ({
    children,
    mode = "redirect",
}: LoginButtonProps) => {

    const router = useNavigate();

    const onClick = () => {
        router("/auth/login");
    }

    if(mode === "modal") {
        return(
            <span>
                TODO: Implement modal
            </span>
        )
    }

    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}