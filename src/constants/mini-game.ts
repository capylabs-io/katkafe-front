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
    value: "How to play",
    module: MINI_GAME_MODULES.GENERAL_INFO,
  },
  SHOP: {
    key: "Shop",
    value: "Shop",
    module: MINI_GAME_MODULES.SHOP,
  },
};

export const MAX_SHIELD_COUNT = 3;

export const SPIN_DURATION = 5000;
export const SPIN_REVOLUTIONS = 5;

export const SPIN_WHEEL_ITEM_COLORS = ["#DED2F9", "#B8A1ED"];

export const RAID_COST = 1;
export const SRAID_COST = 4;
export const REVENGE_COST = 1;

export const MINIMUM_SEARCH_TIME = 3; //seconds

//In game config
export const MINIGAME_SFX_FOLDER = "/mini-game/sfx/";
export const MINIGAME_VFX_FOLDER = "/mini-game/vfx/";
export const MINIGAME_IMAGE_FOLDER = "/mini-game/image/";

export const MINIGAME_BACKGROUND_MUSIC = "raiding-background-music";
export const MINIGAME_SFX = "raiding-sfx";
export const MINIGAME_VFX = "raiding-vfx";
export const MINIGAME_ANIMATION = "raiding-animation";

export const MINIGAME_VFX_TYPES = {
  MARK: "Mark",
  FIRE: "fire",
  BOOM: "boom",
  SHIELD: "shield",
};

export const MINIGAME_SFX_TYPES = {
  BACKGROUND_MUSIC: "Background",
  EXPLOSION: "Explosion",
  FIRE: "Fire",
  SHIELD: "Shield",
  SHOOT: "Shoot",
  SUCCESS: "Success",
};

export const RAID_ANIMATION_COUNT = 4;
export const RAID_ANIMATION_DURATION = 5000; // Duration in milliseconds
export const RAID_ANIMATION_DURATION_DELAY = 6000;

export const LOGS_PER_PAGE = 10;
