import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import React, { useEffect, useMemo } from "react";
import { HomePanel } from "./HomePanel";
import { ShopPanel } from "./ShopPanel";
import { SpinWheelPanel } from "./SpinWheel";
import { RaidPanel } from "./RaidLoot";
import { useUserStore } from "@/stores/userStore";
import { useLoadingStore } from "@/stores/LoadingStore";
import { InfoPanel } from "./InfoPanel";

export const MiniGamePanel = () => {
  const [currentModule] = useMiniGameStore((state) => [state.currentModule]);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);

  const getModulePanel = useMemo(() => {
    switch (currentModule) {
      default:
      case MINI_GAME_MODULES.HOME:
        return <HomePanel />;
      case MINI_GAME_MODULES.SHOP:
        return <ShopPanel />;
      case MINI_GAME_MODULES.DAILY_SPIN:
        return <SpinWheelPanel />;
      case MINI_GAME_MODULES.RAID_LOOT:
        return <RaidPanel />;
      case MINI_GAME_MODULES.GENERAL_INFO:
        return <InfoPanel />;
    }
  }, [currentModule]);

  const handleFetchUserInfo = async () => {
    try {
      showLoading();
      await fetchUser();
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    handleFetchUserInfo();
  }, []);

  return getModulePanel;
};
