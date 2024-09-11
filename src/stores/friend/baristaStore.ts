import { Barista } from "@/types/barista";
import { create } from "zustand";

type States = {
  baristas: Barista[];
  currentBarista: Barista | null;
};

type Actions = {
  setBaristas: (baristas: Barista[]) => void;
  setCurrentBarista: (barista: Barista) => void;
};

const defaultStates = {
  currentBarista: null,
  baristas: [],
};

export const useBaristaStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setBaristas: (baristas: Barista[]) => {
    set({
      baristas,
    });
  },
  setCurrentBarista: (barista: Barista) => {
    set({
      currentBarista: barista,
    });
  },
}));
