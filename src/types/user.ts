export type UserType = {
  _id: string;
  name: string;
  imageUrl: string;
  bean: string;
  rank: string;
  guildId: string;
  isLoginFirstTime: boolean;
  cats: string[];
  location: string[];
  referralCode: string;
  maxTabs: number;
  currentTabs: number;
  lastSyncTabsAt: Date;
  beansPerTab: number;
  level: number;
  shopCounter: number;
  referralCounter: number;
  nextIdleBoostAt: string;
  nextTapBoostAt: string;
};

export type LoginBody = {
  type: string;
  telegramId: string;
};

export type LoginRepsonse = {
  jwt: string;
  user: UserType;
};

export type InviteUrlResponse = {
  inviteUrl: string;
};

export type BoostBody = {
  boostConfigId: string;
};
