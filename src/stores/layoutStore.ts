import { set } from "lodash";
import { create } from "zustand";

type States = {
  showFriendPanel: boolean;
  showStaffPanel: boolean;
  showManagePanel: boolean;
  showUpgradePanel: boolean;
  showAssignPanel: boolean;
  showShopPanel: boolean;
  showInviteInfoPanel: boolean;
  showGuildPanel: boolean;
  showFindGuildPanel: boolean;
  showRollPanel: boolean;
  showQuestPanel: boolean;
  showRankPanel: boolean;
  showGuildDetailPanel: boolean;
  showRestaurantPanel: boolean;
  showOfflineEarning: boolean;
  isAnyPanelOpen: boolean;
  showBoostPanel: boolean;
};

type Actions = {
  setShowFriendPanel: (show: boolean) => void;
  setShowStaffPanel: (show: boolean) => void;
  setShowManagePanel: (show: boolean) => void;
  setShowUpgradePanel: (show: boolean) => void;
  setShowAssignPanel: (show: boolean) => void;
  setShowShopPanel: (show: boolean) => void;
  setShowInviteInfoPanel: (show: boolean) => void;
  setShowGuildPanel: (show: boolean) => void;
  setShowFindGuildPanel: (show: boolean) => void;
  setShowRollPanel: (show: boolean) => void;
  setShowQuestPanel: (show: boolean) => void;
  setShowRankPanel: (show: boolean) => void;
  setShowGuildDetailPanel: (show: boolean) => void;
  setShowRestaurantPanel: (show: boolean) => void;
  setShowOfflineEarning: (show: boolean) => void;
  setIsAnyPanelOpen: (show: boolean) => void;
  setShowBoostPanel: (show: boolean) => void;
};

const defaultStates = {
  showFriendPanel: false,
  showStaffPanel: false,
  showManagePanel: false,
  showUpgradePanel: false,
  showAssignPanel: false,
  showShopPanel: false,
  showInviteInfoPanel: false,
  showGuildPanel: false,
  showFindGuildPanel: false,
  showRollPanel: false,
  showQuestPanel: false,
  showRankPanel: false,
  showGuildDetailPanel: false,
  showRestaurantPanel: false,
  showOfflineEarning: false,
  isAnyPanelOpen: false,
  showBoostPanel: false,
};

export const useLayoutStore = create<States & Actions>((set) => ({
  ...defaultStates,
  setShowFriendPanel: (show: boolean) => {
    set({ showFriendPanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowStaffPanel: (show: boolean) => {
    set({ showStaffPanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowManagePanel: (show: boolean) => {
    set({ showManagePanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowUpgradePanel: (show: boolean) => {
    set({ showUpgradePanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowAssignPanel: (show: boolean) => {
    set({ showAssignPanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowShopPanel: (show: boolean) => {
    set({ showShopPanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowInviteInfoPanel: (show: boolean) => {
    set({ showInviteInfoPanel: show });
  },
  setShowGuildPanel: (show: boolean) => {
    set({ showGuildPanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowFindGuildPanel: (show: boolean) => {
    set({ showFindGuildPanel: show });
  },
  setShowRollPanel: (show: boolean) => {
    set({ showRollPanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowQuestPanel: (show: boolean) => {
    set({ showQuestPanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowRankPanel: (show: boolean) => {
    set({ showRankPanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowGuildDetailPanel: (show: boolean) => {
    set({ showGuildDetailPanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowRestaurantPanel: (show: boolean) => {
    set({ showRestaurantPanel: show });
    set({ isAnyPanelOpen: show });
  },
  setShowOfflineEarning: (show: boolean) => {
    set({ showOfflineEarning: show });
    set({ isAnyPanelOpen: show });
  },
  setIsAnyPanelOpen: (show: boolean) => set({ isAnyPanelOpen: true }),
  setShowBoostPanel: (show: boolean) => {
    set({ showBoostPanel: show });
    set({ isAnyPanelOpen: show });
  },
}));
