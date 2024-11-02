import { CURRENCY_TYPES, Item, ITEM_TYPES, PurchaseReward } from "@/types/item";
import { get } from "lodash";
import React, { useMemo } from "react";
import Image from "next/image";
import { DEFAULT_INFO_ICON } from "@/constants/icon";
import { getIconPathByCurrencyType, getItemBgByType } from "@/utils/shop";

type Props = {
  item: Item;
  currencyType: string;
  onPurchase?: () => void;
};

export const ShopItem = ({ item, onPurchase, currencyType }: Props) => {
  const handlePurchaseClick = () => {
    onPurchase?.();
  };

  const price = useMemo(() => {
    switch (currencyType) {
      case CURRENCY_TYPES.BEAN:
        return item.price;
      case CURRENCY_TYPES.DIAMOND:
        return item.diamondPrice;
      case CURRENCY_TYPES.STAR:
        return item.starPrice;
    }
  }, [currencyType]);

  return (
    <div
      className="flex flex-col justify-center items-center border border-gray-20 rounded-xl p-2 drop-shadow-[0_2px_#b5b5b5] cursor-pointer bg-gray-10"
      onClick={handlePurchaseClick}
    >
      <div className="text-center font-semibold text-bodyMd">
        {get(item, "itemName", "Ticket")}
      </div>
      <div
        className="h-[120px] w-full flex justify-center items-center bg-center bg-no-repeat bg-cover mt-2 rounded-lg"
        style={{
          backgroundImage: `url(${getItemBgByType(
            get(item, "type", ITEM_TYPES.STAR)
          )})`,
        }}
      >
        <Image
          src={get(item, "imgUrl", DEFAULT_INFO_ICON)}
          width={100}
          height={100}
          alt={"item-img"}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-x-2 mt-2 mb-1">
        <div
          className="flex justify-center items-center gap-x-1 text-bodyMd"
          key={currencyType}
        >
          <div>
            <Image
              src={getIconPathByCurrencyType(currencyType)}
              alt={currencyType}
              width={16}
              height={16}
            />
          </div>
          <div>{price}</div>
        </div>
      </div>
    </div>
  );
};
