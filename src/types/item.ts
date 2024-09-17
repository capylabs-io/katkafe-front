import { Staff } from "./common-types";

export type Item = Staff & {
  type: string;
  itemName: string;
  price: number;
  diamondPrice: number;
  data: any;
  configId: Staff;
  imgUrl?: string;
};

export type BuyBody = {
  itemId: string;
  currencyType: CURRENCY_TYPES;
};

export enum CURRENCY_TYPES {
  BEAN = "bean",
  DIAMOND = "diamond",
}
