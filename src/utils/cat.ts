import {
  CAT_AVATAR_FOLDER,
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
