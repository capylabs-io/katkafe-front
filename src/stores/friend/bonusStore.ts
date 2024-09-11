import { Bonus } from "@/types/bonus";
import { create } from "zustand";

type States = {
  bonuses: Bonus[];
  currentBonus: Bonus | null;
};

type Actions = {
  setBonuses: (bonuses: Bonus[]) => void;
  setCurrentBonus: (bonus: Bonus) => void;
};

const defaultStates = {
  currentBonus: null,
  bonuses: [],
};

export const useBonusStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setBonuses: (bonuses: Bonus[]) => {
    set({
      bonuses,
    });
  },
  setCurrentBonus: (bonus: Bonus) => {
    set({
      currentBonus: bonus,
    });
  },
}));
