import { CatAssetType } from "@/types/cat-config";
import { Staff } from "@/types/common-types";
import { getCatAvatarUrl } from "@/utils/cat";
import { get } from "lodash";
import React from "react";
import Image from "next/image";

type Props = {
  cat: Staff;
  width: number;
  height: number;
};

export const CatImage = ({ cat, width, height }: Props) => {
  const isSpecial = get(cat, "isSpecial", false);
  const catHead = get(cat, "itemAssets.head", 0);
  const catBody = get(cat, "itemAssets.body", 0);
  const catFace = get(cat, "itemAssets.face", 0);
  const catCape = get(cat, "itemAssets.cape", 0);
  const catAura = get(cat, "numberStar", 1);
  let catBase = get(cat, "catAsset", 1);
  if (catBase === 0) catBase = 1;

  const catBaseUrl = getCatAvatarUrl(CatAssetType.Base, catBase, isSpecial);
  const catHeadUrl = getCatAvatarUrl(CatAssetType.Hat, catHead, isSpecial);
  const catBodyUrl = getCatAvatarUrl(CatAssetType.Body, catBody, isSpecial);
  const catFaceUrl = getCatAvatarUrl(CatAssetType.Face, catFace, isSpecial);
  const catCapeUrl = getCatAvatarUrl(CatAssetType.Cape, catCape, isSpecial);
  const catAuraUrl = getCatAvatarUrl(CatAssetType.Aura, catAura - 1, isSpecial);

  return (
    <div
      className="flex items-center justify-center relative z-40"
      style={{
        width: width + "px",
        height: height + "px",
      }}
    >
      {catAura > 1 && !isSpecial && (
        <Image
          src={catAuraUrl}
          width={width}
          height={height}
          alt="cat-aura"
          className="absolute top-0 left-0"
        />
      )}
      <Image
        src={catBaseUrl}
        width={width}
        height={height}
        alt="cat-avatar"
        className="absolute top-0 left-0"
      />
      {catBody !== 0 && !isSpecial && (
        <Image
          src={catBodyUrl}
          width={width}
          height={height}
          alt="cat-body"
          className="absolute top-0 left-0"
        />
      )}
      {catCape !== 0 && !isSpecial && (
        <Image
          src={catCapeUrl}
          width={width}
          height={height}
          alt="cat-cape"
          className="absolute top-0 left-0"
        />
      )}
      {catFace !== 0 && !isSpecial && (
        <Image
          src={catFaceUrl}
          width={width}
          height={height}
          alt="cat-face"
          className="absolute top-0 left-0"
        />
      )}
      {catHead !== 0 && !isSpecial && (
        <Image
          src={catHeadUrl}
          width={width}
          height={height}
          alt="cat-head"
          className="absolute top-0 left-0"
        />
      )}
    </div>
  );
};
