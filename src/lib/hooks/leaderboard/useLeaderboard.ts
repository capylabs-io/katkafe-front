import {
  claimReferralRankReward,
  getLeaderboard,
} from "@/requests/leaderboard";
import { getUserCount } from "@/requests/user";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useRankStore } from "@/stores/rank/rankStore";
import { ClaimReferralRankRewardRequest } from "@/types/friend";
import { useState } from "react";

export const useLeaderboad = () => {
  const [showPanel, setShowPanel] = useState({
    gold: false,
  });
  const [setRanks, setCurrentRank, setTotalUsers] = useRankStore((state) => [
    state.setRanks,
    state.setCurrentRank,
    state.setTotalUsers,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);

  const fetchLeaderboard = async (type: string, rarity?: string) => {
    try {
      show();
      const response = await getLeaderboard(type, rarity);
      setRanks(response.topUsers);
      setCurrentRank(response.userRank);
      setTotalUsers(response.totalUsers);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      hide();
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await getUserCount();
      setTotalUsers(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const claimRankReward = async (body: ClaimReferralRankRewardRequest) => {
    try {
      const response = await claimReferralRankReward(body);
      return response;
    } catch (error) {
      console.error("Error claiming", error);
    }
  };

  return {
    showPanel,
    setShowPanel,
    fetchUserCount,
    fetchLeaderboard,
    claimRankReward,
  };
};
