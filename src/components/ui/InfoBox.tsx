import { DEFAULT_INFO_ICON } from "@/constants/icon";
import Image from "next/image";
import React from "react";

type Props = {
  icon?: {
    url: string;
    size?: number;
  };
  content: React.ReactNode;
};

export const InfoBox = ({ icon, content }: Props) => {
  return (
    <div className="flex relative flex-col justify-center border bg-orange-10 border-red-50 rounded-md text-center uppercase py-1 px-4 w-[102px] !h-max">
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
