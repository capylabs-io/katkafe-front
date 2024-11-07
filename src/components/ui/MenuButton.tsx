import React from "react";
import Image from "next/image";
import { DEFAULT_MENU_ICON } from "@/constants/icon";
import classNames from "classnames";
import { Pixelify_Sans } from "next/font/google";

type Props = {
  icon?: {
    url: string;
    size?: number;
  };
  title: string;
  onClick?: () => void | Promise<void>;
  showButtonBg?: boolean;
};

const pixelify = Pixelify_Sans({ subsets: ["latin"] });

export const MenuButton = ({
  icon,
  title,
  onClick,
  showButtonBg = true,
}: Props) => {
  const handleOnClick = () => {
    onClick?.();
  };
  return (
    <button
      className={classNames(
        showButtonBg && "bg-btn-menu bg-no-repeat bg-contain",
        "min-w-[48px] min-h-[48px] relative flex justify-center items-center"
      )}
      style={{
        ...pixelify.style,
      }}
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
      <div className="absolute text-center text-white text-[16px] font-black drop-shadow-[0px_1.5px_black] text-stroke-[0.5px] text-stroke-[#6f6f6f] -bottom-2.5 uppercase">
        {title}
      </div>
    </button>
  );
};
