import { Staff } from "./common-types";

export type Restaurant = {
  _id: string;
  name: string;
  level: number;
  maxLevel: number;
  imgUrl: string;
  maxSlot: string;
  slot: number;
  totalSPB: number;
  staffSlot: number;
  balance: number;
  order: number;
  cats: string[];
};

export type AssignBody = {
  locationId: string;
  catIds: string[];
};

export type RemoveBody = {
  catIds?: string[];
  locationId: string;
  removeAll?: boolean;
};

export type UpgradeBody = {
  locationId: string;
};

export type RequireUpgradeBody = {
  currentLocationLevel: number;
};
