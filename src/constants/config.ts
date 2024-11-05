// Default Telegram window size
export const GAME_WIDTH = 384;
// export const GAME_HEIGHT = 558;
export const GAME_HEIGHT = 672;

// Config
export const CAT_CONFIGS = "cat-configs";

//@TODO: Load from server/config
export const LOCATIONS_COUNT = 4;
export const LOCATION_ASSETS = {
  BACKGROUND: "Floor",
  BTN_FRIEND: "Button-Friend",
  BTN_GACHA: "Button-Gacha",
  BTN_PARTY: "Button-Party",
  BTN_QUEST: "Button-Quest",
  BTN_RANK: "Button-Rank",
  BTN_SWAP: "Button-Swap",
};

export const ASSETS = {
  DEFAULT_BACKGROUND: "default-background",
  LOADING_CAT: "loading-cat",
  LOGO: "logo",
};
// export const ASSET_SCALE = 2 / 5;
export const ASSET_SCALE = 1;

//@TODO: Load from server/config
export const ACTIVE_AREA = {
  START_X: 32,
  END_X: 384 - 32,
  START_Y: 226 + 48,
  END_Y: 608 - 80,
};

export enum COLLISION_CATEGORIES {
  CAT = 1,
  GUEST = 2,
  OBJECTS = 3,
  WALL = 4,
}

//@TODO: Load from server/config
export const CATS_COUNT = 15;
export const CATS_FRAME_RATE = 8;
export const CATS_SCALE = (1 / 2) * 1.2;

export const CAT_MAX_LEVEL = 44;
export const CAT_MAX_SPEED = 50;
export const CAT_MIN_SPEED = 10;
export const CAT_CHANGE_DISPLAY_LEVELS = [
  {
    level: 0,
    type: "none",
  },
  {
    level: 10,
    type: "Apron",
  },
];

export const GUEST_SPEED = 50;
export const MAX_GUESTS = 6;
export const SPECIAL_GUEST_PERCENTAGE = 55;
export const GUEST_MAX_GEN_DELAY = 9000;
export const GUEST_MIN_GEN_DELAY = 3000;
export const GUEST_MAX_ORDER_DELAY = 8000;
export const GUEST_MIN_ORDER_DELAY = 3000;

export const DIALOG_MAX_GEN_DELAY = 20000;
export const DIALOG_MIN_GEN_DELAY = 10000;
export const DIALOG_MIN_DURATION = 3000;
export const DIALOG_MAX_DURATION = 8000;

export const DEFAULT_QUEST_ICON = "/images/user-task.png";
export const DEFAULT_USER_AVATAR = "/icons/user-avatar.png";

//TODO: Change this after
// export const CAT_ASSET_FOLDER = "demo-cats";
export const CAT_ASSET_FOLDER = "cats/spritesheets";
export const CAT_BASE_ASSET_FOLDER = "Cat";
export const CAT_AURA_ASSET_FOLDER = "Aura";
export const CAT_BODY_ASSET_FOLDER = "Body";
export const CAT_FACE_ASSET_FOLDER = "Face";
export const CAT_CAPE_ASSET_FOLDER = "Cape";
export const CAT_HAT_ASSET_FOLDER = "Hat";

export const CAT_BASE_COUNT = 15;
export const CAT_AURA_COUNT = 2;
export const CAT_BODY_COUNT = 5;
export const CAT_FACE_COUNT = 10;
export const CAT_CAPE_COUNT = 9;
export const CAT_HAT_COUNT = 10;

export const CAT_FRAME_WIDTH = 160;
export const CAT_FRAME_HEIGHT = 160;

export const SPECIAL_CHARACTER_COUNT = 12;
export const SPECIAL_CHARACTER_FOLDER = "cats/specials";
export const SPECIAL_AURA_COUNT = 2;
export const SPECIAL_AURA_FOLDER = "specials/auras";
export const SPECIAL_AURA_SOLANA_ID = 1;
export const SPECIAL_AURA_SOLANIUM_ID = 2;

export const SPECIAL_AURA_FRAME_WIDTH = 128;
export const SPECIAL_AURA_FRAME_HEIGHT = 128;

export const CAT_AVATAR_FOLDER = "cats/avatars";
