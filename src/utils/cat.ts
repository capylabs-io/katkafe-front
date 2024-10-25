import {
  CAT_AVATAR_FOLDER,
  SPECIAL_AURA_SOLANA_ID,
  SPECIAL_AURA_SOLANIUM_ID,
  SPECIAL_CHARACTER_FOLDER,
} from "@/constants/config";

export const getCatAvatarUrl = (
  assetType: string,
  index: number,
  isSpecial = false
) => {
  if (!isSpecial)
    return `/assets/${CAT_AVATAR_FOLDER}/${assetType}/${assetType}-${index}.png`;
  else return `/assets/${SPECIAL_CHARACTER_FOLDER}/${index}/avatar.png`;
};

export const getSpecialAuraAsset = (catAsset: number) => {
  switch (catAsset) {
    //Solana aura
    case 5:
      return `/assets/${SPECIAL_CHARACTER_FOLDER}/${SPECIAL_AURA_SOLANA_ID}/aura.png`;
    //Solanium aura
    case 6:
      return `/assets/${SPECIAL_CHARACTER_FOLDER}/${SPECIAL_AURA_SOLANIUM_ID}/aura.png`;
  }
};

export const getSpecialAura = (catAsset: number) => {
  switch (catAsset) {
    //Solana aura
    case 5:
      return SPECIAL_AURA_SOLANA_ID;
    //Solanium aura
    case 6:
      return SPECIAL_AURA_SOLANIUM_ID;
    default:
      return 0;
  }
};

export const getSpecialAuraOffset = (id: number) => {
  switch (id) {
    case 1:
      return { x: 0, y: -56 };
    case 2:
      return { x: 0, y: -48 };
    default:
      return { x: 0, y: 0 };
  }
};
