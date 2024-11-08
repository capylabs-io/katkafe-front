export const AUDIO_EVENTS = {
  PLAY_BGM: "play-bgm",
  PLAY_AMBIENCE: "play-ambience",
  STOP_BGM: "stop-bgm",
  STOP_AMBIENCE: "stop-ambience",
  PLAY_SFX: "play-sfx",
};

export const EVENT_BUS_TYPES = {
  SCENE_READY: "current-scene-ready",
  UI_BUTTON_CLICK: "ui-button-click",
  REMOVE_GUEST: "remove-guest",
  IN_GAME_ERROR: "in-game-error",
  SHOW_RAID_RESULT: "show-raid-result",
};

export const UI_BUTTON = {
  FRIEND: "friend",
  GACHA: "gacha",
  RANK: "rank",
  QUEST: "quest",
  GUIDE: "guide",
};

export const CURRENT_EVENTS = [
  {
    imgUrl:
      "https://capy-ton-test.s3.ap-southeast-1.amazonaws.com/asset/partnership-banner/Partnership+Solanium.png",
    title: "Partnership Solanium",
    startDate: "07/11/2024",
    endDate: "07/11/2024",
  },
  {
    imgUrl:
      "https://capy-ton-test.s3.ap-southeast-1.amazonaws.com/asset/partnership-banner/Whitelist+Solanium.png",
    title: "Solanium Whitelist Announcement",
    startDate: "08/11/2024",
    endDate: "10/11/2024",
  },
  {
    imgUrl:
      "https://capy-ton-test.s3.ap-southeast-1.amazonaws.com/asset/partnership-banner/Token+Sale+Solanium.png",
    title: "Solanium Token Sale",
    startDate: "11/11/2024",
    endDate: "13/11/2024",
  },
];

export const SHOW_ANNOUNCEMENT =
  (process.env.NEXT_PUBLIC_SHOW_ANNOUNCEMENT || "0") === "1";
export const TOKEN_SALE_START_DATE = process.env.NEXT_PUBLIC_TOKEN_SALE_START;
export const TOKEN_SALE_END_DATE = process.env.NEXT_PUBLIC_TOKEN_SALE_END;
