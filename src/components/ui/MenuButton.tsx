import React from "react";
import Image from "next/image";
import { DEFAULT_MENU_ICON } from "@/constants/icon";

type Props = {
    icon?: {
        url: string;
        size?: number;
    };
    title: string;
    onClick?: () => void | Promise<void>;
};

export const MenuButton = ({ icon, title, onClick }: Props) => {
    const handleOnClick = () => {
        onClick?.();
    };
    return (
        <button
            className="w-[48px] h-[48px] bg-btn-menu bg-no-repeat bg-contain relative flex justify-center items-center"
            onClick={handleOnClick}
        >
            <div>
                <Image
                    src={icon?.url || DEFAULT_MENU_ICON}
                    width={icon?.size || 28}
                    height={icon?.size || 28}
                    alt="icon"
                />
            </div>
            <div className="absolute text-center text-white text-[14px] font-bold drop-shadow-[0px_1px_black] text-stroke-[0.75px] text-stroke-[#6f6f6f] -bottom-1.5">
                {title}
            </div>
        </button>
    );
};

