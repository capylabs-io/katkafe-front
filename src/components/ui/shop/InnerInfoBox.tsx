import { DEFAULT_INFO_ICON } from "@/constants/icon";
import classNames from "classnames";
import Image from "next/image";
import React from "react";

type Props = {
  icon?: {
    url: string;
    size?: number;
  };
  content: React.ReactNode;
  className?: string;
};

export const InnerInfoBox = ({ icon, content, className }: Props) => {
  return (
    <div
      className={classNames(
        "flex relative items-center border bg-orange-20 border-[#DDDCC9] rounded-md text-center uppercase py-1 px-4 max-w-[120px] !h-max",
        className
      )}
    >
      <div className="absolute -left-2.5">
        <Image
          src={icon?.url || DEFAULT_INFO_ICON}
          width={icon?.size || 24}
          height={icon?.size || 24}
          alt="icon"
        />
      </div>
      <div className="flex w-full items-center justify-center px-1">
        <div className="grow text-base leading-tight">{content}</div>
      </div>
    </div>
  );
};
