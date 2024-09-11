import { Roll } from "@/types/roll";
import { create } from "zustand";

type States = {
  rolls: Roll[];
  currentRoll: Roll | null;
};

type Actions = {
  setRolls: (rolls: Roll[]) => void;
  setCurrentRoll: (roll: Roll) => void;
};

const defaultStates = {
  currentRoll: null,
  rolls: [],
};

export const useRollStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setRolls: (rolls: Roll[]) => {
    set({
      rolls,
    });
  },
  setCurrentRoll: (roll: Roll) => {
    set({
      currentRoll: roll,
    });
  },
}));
