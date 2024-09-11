import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { Rank } from "@/types/friend";
import Button from "./Button";
import { Check } from "lucide-react";

type Props = {
  rankConfig: Rank;
  onClick?: () => void;
};

const CardBonus = ({ rankConfig, onClick }: Props) => {
  const imgUrl = get(rankConfig, "imgUrl", "");
  const name = get(rankConfig, "name", "");
  const requiredReferral = get(rankConfig, "requiredReferral", 0);
  const beanReward = get(rankConfig, "beanReward", "0");
  const id = get(rankConfig, "_id", "");
  const claimable = get(rankConfig, "claimable", false);
  const done = get(rankConfig, "done", false);

  return (
    <div className="w-full h-full p-2 grid gap-8 items-center justify-between grid-cols-10">
      <div className="flex gap-2 items-center text-center col-span-4">
        <div className="rounded-full w-6 h-6">
          <Image src={imgUrl} alt="rank pic" width={24} height={24} />
        </div>
        <div className="flex flex-col">
          <div className="text-bodyMd text-gray-40">{name}</div>
          {!claimable && !done && (
            <Button customClassNames="!w-12 !h-4 text-sm border-[1px]" disabled>
              Claim
            </Button>
          )}
          {claimable && !done && (
            <Button
              customClassNames="!w-12 !h-4 text-sm border-[1px]"
              onClick={onClick}
            >
              Claim
            </Button>
          )}
          {done && (
            <div className="w-full flex justify-center">
              <Check size={16} className="text-green-500" />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 col-span-3">
        <div className="flex items-center gap-x-1">
          <div className="text-bodyMd text-gray-40">+{requiredReferral}</div>
          <div className="w-4 h-4">
            <Image
              src="/icons/ic-user-ref.png"
              alt="icon user"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 col-span-3">
        <div className="text-bodyMd text-gray-40">+{beanReward}</div>
      </div>
    </div>
  );
};

export default CardBonus;
