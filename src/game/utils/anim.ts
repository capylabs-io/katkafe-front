import { LAYERS } from "@/constants/layers";
import { CatAssetType } from "@/types/cat-config";

export const getCatItemLayer = (assetType: string) => {
  switch (assetType) {
    case CatAssetType.Hat:
      return LAYERS.CAT_HAT;
    case CatAssetType.Body:
      return LAYERS.CAT_BODY;
    case CatAssetType.Face:
      return LAYERS.CAT_FACE;
    case CatAssetType.Cape:
      return LAYERS.CAT_CAPE;
    case CatAssetType.Aura:
      return LAYERS.CAT_AURA;
    default:
      return LAYERS.CAT_BASE;
  }
};

export const getCatTextureName = (
  assetType: string,
  index: number,
  isSpecial = false
) => {
  if (!isSpecial) return `${assetType}-${index}`;
  else return `Special-${index}`;
};
