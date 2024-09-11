import React from "react";
import Button from "./Button";
import Image from "next/image";
import { ShopType } from "@/types/bundle";
import CatCard from "./CatCard";
import { Item } from "@/types/item";
import { RarityTag } from "./cat/RarityTag";
import { CatRarity } from "@/types/cat-config";
import { get } from "lodash";

type Props = {
  type: ShopType;
  onClose?: () => void;
  closeShopPanel?: () => void;
  handleChooseDetail?: (item: Item) => void;
  button: {
    type: "coin" | "item";
  };
  item: any;
};

const RewardDialog: React.FC<Props> = ({
  button,
  type,
  onClose,
  closeShopPanel,
  handleChooseDetail,
  item,
}: Props) => {
  const handleBack = () => {
    onClose?.();
  };
  const handleClick = () => {
    closeShopPanel?.();
  };

  return (
    <div className="bg-orange-10 absolute rounded-2xl w-[95%] text-center pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
      <div className="text-xl">Congratulation!</div>
      {type === ShopType.Roll && (
        <div className="text-lg text-gray-30 mb-2">
          You purchased a pack successfully! You received:
        </div>
      )}
      {type === ShopType.Cat && (
        <div className="text-lg text-gray-30 mb-2">
          You purchased a staff successfully!
        </div>
      )}
      {type === ShopType.Bundle && (
        <div className="text-lg text-gray-30 mb-2">
          You purchased {item?.name} successFully! You received:
        </div>
      )}

      <div className="flex gap-1 justify-center">
        {type === ShopType.Bundle &&
          item.map(
            (
              item: { name: string; value: string; imageUrl: string },
              index: number
            ) => (
              <div
                key={index}
                className="w-[64px] h-[74px] bg-[#4E322F] p-1 rounded-lg"
              >
                <div className="bg-[#FFFEEC] flex items-center justify-center w-[56px] h-[48px] rounded-md">
                  <Image src={item.imageUrl} alt={""} width={28} height={28} />
                </div>
                <div className="text-center text-white">{item.value}</div>
              </div>
            )
          )}
        {type === ShopType.Cat && item && (
          <div className="w-[140px] h-[182px] cursor-pointer">
            <CatCard cat={item} />
          </div>
        )}

        {type === ShopType.Roll && item && (
          <div className="w-[140px] h-[182px] cursor-pointer">
            <CatCard cat={item} width={112} height={112} size="large" />
          </div>
        )}
      </div>
      <div className="flex gap-3 items-center justify-center mx-auto mt-2 px-2 py-1">
        <RarityTag
          rarity={get(item, "rarity", CatRarity.Common)}
          isSpecial={get(item, "isSpecial", false)}
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3 mt-6">
        {type === ShopType.Bundle && (
          <div className="w-[164px] h-[39px]" onClick={handleClick}>
            <Button>Back home</Button>
          </div>
        )}
        {type === ShopType.Cat && (
          <div className="w-[164px] h-[39px]">
            <Button onClick={handleChooseDetail}>View Detail</Button>
          </div>
        )}
        {type === ShopType.Roll && (
          <div className="w-[164px] h-[39px]">
            <Button onClick={handleChooseDetail}>View Detail</Button>
          </div>
        )}
        <div className="w-[164px] h-[39px]" onClick={handleBack}>
          <Button>Keep shopping</Button>
        </div>
      </div>
    </div>
  );
};

export default RewardDialog;
