import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import React, { useMemo } from "react";
import { HomePanel } from "./HomePanel";
import { ShopPanel } from "./ShopPanel";

export const MiniGamePanel = () => {
  const [currentModule, setCurrentModule] = useMiniGameStore((state) => [
    state.currentModule,
    state.setCurrentModule,
  ]);

  const getModulePanel = useMemo(() => {
    switch (currentModule) {
      default:
      case MINI_GAME_MODULES.HOME:
        return <HomePanel />;
      case MINI_GAME_MODULES.SHOP:
        return <ShopPanel />;
    }
  }, [currentModule]);

  return getModulePanel;
};
