import { BASE_URL } from "@/constants/api-url";
import katAxios from "./axios.config";
import { ClaimReferralRankRewardRequest, Rank } from "@/types/friend";

export const getRankConfig = async () => {
  const response = await katAxios.get<Rank[]>(`${BASE_URL}/referrals/ranking`);
  return response.data;
};

export const getLeaderboard = async (type: string, rarity?: string) => {
  const response = await katAxios.get(
    `${BASE_URL}/leaderboard/${type}${!rarity ? "" : "/" + rarity}`
  );
  return response.data;
};

export const claimReferralRankReward = async (
  body: ClaimReferralRankRewardRequest
) => {
  const response = await katAxios.post(`${BASE_URL}/referrals/claim`, body);
  return response.data;
};
