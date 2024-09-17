import { QuestCodes } from "@/constants/quest";

export enum RewardType {
  KBUCK = "kBuck",
  BEAN = "bean",
  DIAMOND = "diamond",
}

export type Quest = {
  _id: string;
  name: string;
  questCode: QuestCodes;
  description: string;
  type: string;
  reward: {
    type: RewardType;
    value: string;
  };
  task: string;
  progress: boolean;
  visitUrl?: string;
  imgUrl: string;
  needCheck: boolean;
  isEventQuest: boolean;
};

export type Achievement = {
  id: string;
  title: string;
  imageUrl: string;
  claim: string;
  totalAchievement: string | number;
};
