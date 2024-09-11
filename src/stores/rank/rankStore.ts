import { set } from "lodash";
import { LeaderBoard } from "@/types/leaderBoard";
import { create } from "zustand";

type States = {
  ranks: LeaderBoard[];
  currentRank: LeaderBoard | null;
  totalUsers: number;
};

type Actions = {
  setRanks: (ranks: LeaderBoard[]) => void;
  setCurrentRank: (rank: LeaderBoard) => void;
  setTotalUsers: (totalUsers: number) => void;
};

const defaultStates = {
  currentRank: null,
  ranks: [],
  totalUsers: 0,
};

export const useRankStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setRanks: (ranks: LeaderBoard[]) => {
    set({
      ranks,
    });
  },
  setCurrentRank: (rank: LeaderBoard) => {
    set({
      currentRank: rank,
    });
  },
  setTotalUsers: (totalUsers: number) => {
    set({
      totalUsers,
    });
  },
}));
