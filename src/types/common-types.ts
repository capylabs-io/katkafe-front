import { CatRarity } from "./cat-config";

export type Restaurant = {
  staff: any;
  id: number;
  name: string;
  level: number;
  imageUrl: string;
  maxSlot: any;
  totalSPB: number;
  staffSlot: number;
  balance: number;
};

export type Staff = {
  isCanUpgrade: any;
  _id: string;
  name: string;
  level: number;
  imgUrl: string;
  numberStar: number;
  backgroundUrl: string;
  rarity: string;
  power: string;
  assetName: string;

  //New Cat Config
  catAsset: number;
  itemAssets: {
    head: number;
    body: number;
    face: number;
    cape: number;
  };
  isSpecial: boolean;
};

export const RARITY_CONFIG = {
  COMMON: {
    value: "COMMON",
    backgroundCard: "url('/images/card-common.png')",
    textColorClasses: "text-black",
  },
  RARE: {
    value: "RARE",
    backgroundCard: "url('/images/card-rare.png')",
    textColorClasses: "text-white",
  },
  EPIC: {
    value: "EPIC",
    backgroundCard: "url('/images/card-epic.png')",
    textColorClasses: "text-white",
  },
  SPECIAL: {
    value: "SPECIAL",
    backgroundCard: "url('/images/card-special.png')",
    textColorClasses: "text-white",
  },
};

export const rarityToConfig = (rarity: string, isSpecial = false) => {
  if (isSpecial) return RARITY_CONFIG.SPECIAL;
  switch (rarity) {
    default:
    case CatRarity.Common:
      return RARITY_CONFIG.COMMON;
    case CatRarity.Rare:
      return RARITY_CONFIG.RARE;
    case CatRarity.Epic:
      return RARITY_CONFIG.EPIC;
  }
};
