import React from "react";
import Image from "next/image";
import { CatRarity } from "@/types/cat-config";

type Props = {
  rarity: string;
  isSpecial: boolean;
};

export const RarityTag = ({ rarity, isSpecial }: Props) => {
  if (isSpecial) {
    return (
      <Image
        src="/images/rarity/special.png"
        width={100}
        height={28}
        alt="common"
      />
    );
  }
  switch (rarity) {
    case CatRarity.Common:
      return (
        <Image
          src="/images/rarity/common.png"
          width={100}
          height={28}
          alt="common"
        />
      );
    case CatRarity.Rare:
      return (
        <Image
          src="/images/rarity/rare.png"
          width={100}
          height={28}
          alt="rare"
        />
      );
    case CatRarity.Epic:
      return (
        <Image
          src="/images/rarity/epic.png"
          width={100}
          height={28}
          alt="epic"
        />
      );
  }
};
