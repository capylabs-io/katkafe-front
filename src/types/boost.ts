export enum BoostType {
  IDLE = "idle",
  TAP = "tap",
}

export type BoostConfig = {
  _id: string;
  name: string;
  description: string;
  type: BoostType;
  boostMultiply: number;
  fee: string;
  duration: number;
  cooldown: number;
  imgUrl: string;
};

export type UserBoost = {
  _id: string;
  user: string;
  boostConfig: BoostConfig;
  startAt: Date;
  endAt: Date;
};
