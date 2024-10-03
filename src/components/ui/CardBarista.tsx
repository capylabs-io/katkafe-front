import React from "react";
import Image from "next/image";
import { DEFAULT_QUEST_ICON } from "@/constants/config";
import { formatStringNumber, ordinalSuffix } from "@/utils/helpers";
import FormatText from "./FormatText";

type Props = {
  id: number;
  username: string;
  imageUrl: string;
  value: string;
  isShowIcon?: boolean;
  iconUrl?: string;
};

const CardBarista = ({
  id,
  username,
  imageUrl,
  value,
  isShowIcon = false,
  iconUrl,
}: Props) => {
  return (
    <div className="w-full h-full p-2 pl-4 flex gap-8 items-center justify-between text-gray-60">
      <div className="flex gap-y-2 gap-x-4 items-center text-center">
        <div className="px-2 text-bodyMd">{ordinalSuffix(id + 1)}</div>
        <div className="rounded-full w-6 h-6">
          <Image
            src={imageUrl || DEFAULT_QUEST_ICON}
            alt="user avatar"
            width={24}
            height={24}
            className="rounded-[100px]"
          />
        </div>
        <div className="text-bodySm">
          <FormatText text={username} />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-1 text-bodyMd">
          <div className="flex items-center justify-end gap-1">
            <div>{formatStringNumber(value)}</div>
            {isShowIcon && (
              <div className="w-4 h-4">
                <img src={iconUrl} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBarista;
