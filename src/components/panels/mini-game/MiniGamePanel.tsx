import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import React, { useMemo } from "react";
import { HomePanel } from "./HomePanel";
import { ShopPanel } from "./ShopPanel";
import { SpinWheelPanel } from "./SpinWheel";
import { RaidPanel } from "./RaidLoot";

export const MiniGamePanel = () => {
  const [currentModule] = useMiniGameStore((state) => [state.currentModule]);

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
    }
  }, [currentModule]);

  return getModulePanel;
};
