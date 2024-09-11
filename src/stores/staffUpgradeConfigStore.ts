import { StaffUpgradeConfig } from "@/types/staffUpgradeConfig";
import { create } from "zustand";

type States = {
  staffUpgradeConfigs: StaffUpgradeConfig[];
};

type Action = {
  setStaffUpgradeConfigs: (staffUpgradeConfig: StaffUpgradeConfig[]) => void;
};

const defaultStates: States = {
  staffUpgradeConfigs: [],
};

export const useStaffUpgradeConfigStore = create<States & Action>(
  (set, get) => ({
    ...defaultStates,
    setStaffUpgradeConfigs: (staffUpgradeConfigs: StaffUpgradeConfig[]) => {
      set({
        staffUpgradeConfigs,
      });
    },
  })
);
