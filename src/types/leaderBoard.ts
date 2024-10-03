import { UserType } from "./user";

export type LeaderBoard = UserType & {
  rankValue: string;
  rank: number;
};
