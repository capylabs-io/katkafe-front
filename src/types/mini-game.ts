import { UserType } from "./user";

export const MINI_GAME_MODULES = {
  HOME: "home",
  DAILY_SPIN: "daily-spin",
  RAID_LOOT: "raid-loot",
  RAIDING: "raiding",
  GENERAL_INFO: "general-info",
  SHOP: "mini-shop",
};

export enum RAID_TYPES {
  RAID = "RAID",
  SRAID = "S-RAID",
}

export type RaidLog = {
  _id: string;
  beanReward: string;
  isRevenged: boolean;
  isSRAID: boolean;
  raidedUser: UserType;
  user: UserType;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type RaidLogResponse = {
  data: RaidLog[];
  metadata: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
};
