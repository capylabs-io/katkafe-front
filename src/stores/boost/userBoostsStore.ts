import { UserBoost } from "@/types/boost";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  userBoosts: UserBoost[];
};

type Actions = {
  clear: () => void;
  setUserBoosts: (userBoosts: UserBoost[]) => void;
};

const defaultStates: State = {
  userBoosts: [],
};

export const useUserBoostsStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...defaultStates,
      clear: () => {
        set(defaultStates);
      },
      setUserBoosts: (userBoosts) => {
        set({ userBoosts });
      },
    }),
    { name: "userStore" }
  )
);
