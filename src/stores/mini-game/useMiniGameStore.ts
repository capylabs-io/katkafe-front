import { set } from "lodash";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import { UserType } from "@/types/user";
import { create } from "zustand";

type States = {
  currentModule: string;
  raidUser?: UserType;
  raidResult?: any;
};

type Actions = {
  setCurrentModule: (module: string) => void;
  setRaidUser: (user: UserType) => void;
  setRaidResult: (result: any) => void;
};

const defaultStates = {
  currentModule: MINI_GAME_MODULES.HOME,
  isRaiding: false,
};

export const useMiniGameStore = create<States & Actions>((set) => ({
  ...defaultStates,
  setRaidUser: (user: UserType) => set({ raidUser: user }),
  setRaidResult: (result: any) => set({ raidResult: result }),
  setCurrentModule: (module: string) => set({ currentModule: module }),
}));
