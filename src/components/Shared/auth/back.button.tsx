"use client"

import { Button } from "@/components/UI/button";
import { Link } from "react-router-dom";

interface BackButtonProps{
    label: string;
    href: string;
}

export const BackButton = ({
    label,
    href
}: BackButtonProps) => {
    return(
        <Button 
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
        >
            <Link to={href}>
                {label}
            </Link>
        </Button>
    )
}