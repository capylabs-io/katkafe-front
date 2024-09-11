import React from "react";
import Image from "next/image";
import { DEFAULT_QUEST_ICON } from "@/constants/config";
import { TABS } from "../panels/friend/Friend";
import { formatStringNumber, ordinalSuffix } from "@/utils/helpers";
import FormatText from "./FormatText";
import { get } from "lodash";

type Props = {
  type: string;
  id: number;
  username: string;
  avatarUrl: string;
  referralReward: string;
  totalBonus?: number;
  totalFriend?: number;
  bean: string;
};

const CardBarista = ({
  id,
  type,
  username,
  avatarUrl,
  referralReward,
  bean,
}: Props) => {
  return (
    <div className="w-full h-full p-2 pl-4 flex gap-8 items-center justify-between text-gray-60">
      <div className="flex gap-y-2 gap-x-4 items-center text-center">
        <div className="px-2 text-bodyMd">{ordinalSuffix(id + 1)}</div>
        <div className="rounded-full w-6 h-6">
          <Image
            src={avatarUrl || DEFAULT_QUEST_ICON}
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
            {type === TABS.FRIENDLIST && (
              <div>{formatStringNumber(referralReward)}</div>
            )}
            {type !== TABS.FRIENDLIST && <div>{formatStringNumber(bean)}</div>}
            <div className="w-4 h-4">
              <img src="/images/coin.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBarista;
