import { create } from "zustand";

type States = {
  showFriendPanel: boolean;
  showStaffPanel: boolean;
  showManagePanel: boolean;
  showUpgradePanel: boolean;
  showAssignPanel: boolean;
  showShopPanel: boolean;
  // showStaffDetailPanel: boolean;

  // previousPanel: "staff" | "manage" | "staff-detail" | "Friend" | null;
};

type Actions = {
  setShowFriendPanel: (show: boolean) => void;
  setShowStaffPanel: (show: boolean) => void;
  setShowManagePanel: (show: boolean) => void;
  setShowUpgradePanel: (show: boolean) => void;
  setShowAssignPanel: (show: boolean) => void;
  setShowShopPanel: (show: boolean) => void;
  // setStaffDetailPanel: (show: boolean) => void;
};

const defaultStates = {
  showFriendPanel: false,
  showStaffPanel: false,
  showManagePanel: false,
  showUpgradePanel: false,
  showAssignPanel: false,
  showShopPanel: false,
  // showStaffDetailPanel: false,
};

export const useLayoutStore = create<States & Actions>((set) => ({
  ...defaultStates,
  setShowFriendPanel: (show: boolean) => {
    set({
      showFriendPanel: show,
    });
  },
  setShowStaffPanel: (show: boolean) => {
    set({
      showStaffPanel: show,
    });
  },
  setShowManagePanel: (show: boolean) => {
    set({
      showManagePanel: show,
    });
  },
  setShowUpgradePanel: (show: boolean) => {
    set({
      showUpgradePanel: show,
    });
  },
  setShowAssignPanel: (show: boolean) => {
    set({
      showAssignPanel: show,
    });
  },
  setShowShopPanel: (show: boolean) => {
    set({
      showShopPanel: show,
    });
  },
  // setStaffDetailPanel: (show: boolean) => {
  //     set({
  //         showStaffDetailPanel: show,
  //     });
  // },
}));