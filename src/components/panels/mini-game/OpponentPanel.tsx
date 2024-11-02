import React from "react";
import Image from "next/image";
import { getIconPathByCurrencyType } from "@/utils/shop";
import { CURRENCY_TYPES, ITEM_TYPES } from "@/types/item";
import { get } from "lodash";
import { UserType } from "@/types/user";
import { DEFAULT_QUEST_ICON } from "@/constants/config";
import { InnerInfoBox } from "@/components/ui/shop/InnerInfoBox";
import { formatStringNumber } from "@/utils/helpers";

type Props = {
  user: UserType;
};

export const OpponentPanel = ({ user }: Props) => {
  return (
    <>
      <div className="bg-[#807f76] opacity-70 absolute w-full h-full items-center flex justify-center top-0 left-0 !z-30"></div>
      <div className="bg-orange-10 absolute rounded-2xl w-[90%] text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !z-40 flex flex-col justify-center items-center p-4">
        <div className="text-xl font-semibold">Target found!</div>
        <div className="text-md text-gray-30 leading-5 mt-2">
          Please wait a few seconds...
        </div>
        <div className="rounded-lg flex justify-center mt-4">
          <Image
            // src={user.avatarUrl || DEFAULT_QUEST_ICON}
            src={"/images/mini-game/TargetFound.png"}
            alt="target"
            width={96}
            height={96}
          />
        </div>
        <div className="mt-4 mb-2">{user.username}</div>
        <InnerInfoBox
          className="min-w-[120px]"
          content={formatStringNumber(get(user, "bean", "0"))}
          icon={{
            url: getIconPathByCurrencyType(CURRENCY_TYPES.BEAN),
          }}
        />
      </div>
    </>
  );
};
