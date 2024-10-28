import { MINI_GAME_MODULES } from "@/types/mini-game";
import { create } from "zustand";

type States = {
  currentModule: string;
};

type Actions = {
  setCurrentModule: (module: string) => void;
};

const defaultStates = {
  currentModule: MINI_GAME_MODULES.HOME,
};

export const useMiniGameStore = create<States & Actions>((set) => ({
  ...defaultStates,
  setCurrentModule: (module: string) => set({ currentModule: module }),
}));
