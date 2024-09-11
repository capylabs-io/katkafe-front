import React, { useMemo } from "react";
import Button from "./Button";
import Image from "next/image";
import Star from "./Star";
import CatCard from "./CatCard";
import { Staff } from "@/types/common-types";
import { EventReward, EventRewardType } from "@/types/event";
import { EventRewardInfo } from "./event/EventRewardInfo";

type Props = {
  handleClaim: () => void;
  cat?: Staff;
  rewards?: EventReward[];
};

const AwardPanel = ({ handleClaim, cat, rewards }: Props) => {
  const assetRewards = useMemo(() => {
    if (!rewards) return [];
    return rewards?.filter(
      (reward) =>
        reward.type !== EventRewardType.CAT &&
        reward.type !== EventRewardType.SPECIAL_CAT
    );
  }, [rewards]);
  return (
    <div className="bg-[#232322] bg-opacity-85 absolute w-full h-full items-center flex justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div>
        <div className="text-center text-white text-lg">Congratulations!</div>
        <div className="text-center text-white text-bodyMd mb-3">
          You have received following reward
        </div>
        {cat && (
          <div className="w-[140px] h-[182px] mx-auto">
            <CatCard cat={cat} size="large" width={112} height={112} />
          </div>
        )}
        {rewards && assetRewards.length > 0 && (
          <div className="flex flex-col gap-y-2 text-white text-center items-center">
            <div>+</div>
            {rewards
              .filter(
                (reward) =>
                  reward.type !== EventRewardType.CAT &&
                  reward.type !== EventRewardType.SPECIAL_CAT
              )
              .map((reward, index) => (
                <EventRewardInfo reward={reward} key={index} />
              ))}
          </div>
        )}
        <div className="w-full text-center mt-6">
          <div className="flex gap-2 justify-center">
            <div
              className="w-[172px] h-[39px] bg-orange-10 rounded-xl"
              onClick={handleClaim}
            >
              <Button>Claim</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardPanel;
