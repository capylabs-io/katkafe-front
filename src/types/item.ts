import { Staff } from "./common-types";

export type Item = Staff & {
  type: string;
  itemName: string;
  price: number;
  data: any;
  configId: Staff;
  imgUrl?: string;
};

export type BuyBody = {
  itemId: string;
};
