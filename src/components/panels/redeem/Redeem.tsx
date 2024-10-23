import AwardPanel from "@/components/ui/AwardPanel";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import { redeemGiftCode } from "@/requests/event/events";
import { getOneStaff } from "@/requests/staff";
import { useLayoutStore } from "@/stores/layoutStore";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { EventReward, EventRewardType } from "@/types/event";
import { Divider } from "@mui/material";
import { X } from "lucide-react";
import React, { useState } from "react";

export const RedeemPanel = () => {
  const [code, setCode] = useState("");
  const [showReward, setShowReward] = useState(false);
  const [rewards, setRewards] = useState<EventReward[]>([]);
  const [catReward, setCatReward] = useState<any>();

  const { fetchStaffs } = useFetchStaffs();

  const show = useSnackBarStore((state) => state.show);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const setShowRedeemPanel = useLayoutStore(
    (state) => state.setShowRedeemPanel
  );

  const handleRedeemCode = async () => {
    if (!code) {
      show("Please enter a redeem code");
      return;
    }
    try {
      showLoading();
      const res = await redeemGiftCode(code);
      if (res && res.length > 0) {
        show("Redeem code successfully!");
        setRewards(res);
        setShowReward(true);

        const catReward = res.find(
          (reward) =>
            reward.type === EventRewardType.CAT ||
            reward.type === EventRewardType.SPECIAL_CAT
        );

        if (catReward && catReward.catId) {
          const rewardCat = await getOneStaff(catReward.catId);
          setCatReward(rewardCat);
        }
        await fetchStaffs();
        setShowRedeemPanel(false);
      }
    } catch (error) {
      console.error(error);
      show("Redeem code failed!");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0 flex justify-center items-center">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-fit mt-4 bg-orange-10 relative">
        <X
          size={24}
          className="absolute top-4 right-4 cursor-pointer text-black"
          onClick={() => setShowRedeemPanel(false)}
        />
        <div className="p-4">
          <div className="text-center text-xl">Redeem Code</div>
          <div className="text-center">Enter redeem code to obtain goods</div>
          <Input
            id="redeemCode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-[#e8e7d9] border-2 border-gray-400 h-12 text-lg px-4 mt-3"
            placeholder="Enter code here"
          />
        </div>
        <Divider />
        <div className="p-4">
          <Button
            onClick={handleRedeemCode}
            customClassNames="text-lg font-medium min-h-10"
          >
            Redeem
          </Button>
        </div>
      </div>
      {showReward && (
        <AwardPanel
          handleClaim={() => setShowReward(false)}
          cat={catReward}
          rewards={rewards}
        />
      )}
    </div>
  );
};
