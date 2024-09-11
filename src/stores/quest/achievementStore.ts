import { Achievement } from "@/types/quest";
import { create } from "zustand";

type States = {
  achievements: Achievement[];
  currentAchievement: Achievement | null;
};

type Actions = {
  setAchievements: (achievements: Achievement[]) => void;
  setCurrentAchievement: (achievement: Achievement) => void;
};

const defaultStates = {
  currentAchievement: null,
  achievements: [],
};

export const useAchievementStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setAchievements: (achievements: Achievement[]) => {
    set({
      achievements,
    });
  },
  setCurrentAchievement: (achievement: Achievement) => {
    set({
      currentAchievement: achievement,
    });
  },
}));
