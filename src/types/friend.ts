export type Friend = {
  _id: string;
  username: string;
  avatarUrl: string;
  referralCounter: number;
  referralReward: string;
};

export type Rank = {
  _id: string;
  name: string;
  numberReferral: number;
  beanReward: string;
  imgUrl: string;
  requiredReferral: number;
};

export type FriendListResponse = {
  referralList: Friend[];
  userRank: Rank;
};

export type ClaimReferralRankRewardRequest = {
  rankConfigId: string;
};
