import { Staff } from "./common-types";

export enum ITEM_TYPES {
  CAT = "cat",
  BUNDLE = "bundle",
  PACK = "pack",
  STAR = "star",
  RAID = "raid",
  SPIN = "spin",
  SHIELD = "shield",
  STARTER_BUNDLE = "starter_bundle",
}

export type Item = Staff & {
  type: string; //ITEM_TYPES
  itemName: string;
  price: number;
  diamondPrice: number;
  starPrice: number;
  data: any;
  configId: Staff;
  imgUrl?: string;
};

export type BuyBody = {
  itemId: string;
  currencyType: CURRENCY_TYPES;
};

export type PurchaseReward = {
  type: CURRENCY_TYPES;
  value: string;
};

export enum CURRENCY_TYPES {
  BEAN = "bean",
  DIAMOND = "diamond",
  STAR = "star",
  RAID = "raid",
  SPIN = "spin",
  SHIELD = "shield",
}
