import { Quest } from "./quest";

export enum EventRewardType {
  BEAN = "bean",
  DIAMOND = "diamond",
  CAT = "cat",
  SPECIAL_CAT = "special_cat",
}

export type EventReward = {
  type: EventRewardType;
  value: string;
};

export type EventType = {
  _id: string;
  name: string;
  description: string;
  logoUrl: string;
  reward: EventReward[];
  isActive: boolean;
  quests: Quest[];
};
