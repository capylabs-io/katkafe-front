import { MINI_GAME_MODULES } from "@/types/mini-game";

export const MINI_GAME_PANELS = {
  DAILY_SPIN: {
    key: "Spin",
    value: "Daily Spin",
    module: MINI_GAME_MODULES.DAILY_SPIN,
  },
  RAID_LOOT: {
    key: "Raid",
    value: "Raid Loot",
    module: MINI_GAME_MODULES.RAID_LOOT,
  },
  GENERAL_INFO: {
    key: "Info",
    value: "General Info",
    module: MINI_GAME_MODULES.GENERAL_INFO,
  },
  SHOP: {
    key: "Shop",
    value: "Shop",
    module: MINI_GAME_MODULES.SHOP,
  },
};

export const MAX_SHIELD_COUNT = 3;

export const SPIN_DURATION = 3000;
export const SPIN_REVOLUTIONS = 3;
