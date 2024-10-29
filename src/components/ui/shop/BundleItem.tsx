import { CURRENCY_TYPES, Item, ITEM_TYPES, PurchaseReward } from "@/types/item";
import { get } from "lodash";
import React, { useMemo } from "react";
import Image from "next/image";
import { DEFAULT_INFO_ICON } from "@/constants/icon";
import { getIconPathByCurrencyType, getItemBgByType } from "@/utils/shop";
import { formatStringNumber } from "@/utils/helpers";
import { InfoBox } from "../InfoBox";
import { useUserStore } from "@/stores/userStore";
import moment from "moment";
import { STARTER_DATE } from "@/constants/shop";
import Button from "../Button";

type Props = {
  item: Item;
  currencyType: string;
  onPurchase?: () => void;
};
export const BundleItem = ({ item, onPurchase, currencyType }: Props) => {
  const user = useUserStore((state) => state.user);

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

  const rewards = useMemo(() => {
    return Object.entries(item.data).map(([type, value]) => ({
      type,
      value,
    })) as PurchaseReward[];
  }, [item.data]);

  const purchaseLimit = get(item, "limitPurchaseTimes", 1);
  const purchasedTimes = get(item, "purchasedTimes", 0);
  const isReachLimit = get(item, "isReachLimitPurchase", false);
  const isBeforeStarterDate =
    !user ||
    !user.createdAt ||
    moment(user.createdAt).isBefore(moment(STARTER_DATE, "YYYY-MM-DD"));
  const isPurchaseDisabled = isReachLimit || isBeforeStarterDate;

  return (
    <div className="flex flex-col justify-center items-center border border-orange-20 rounded-xl p-2 shadow-bottom-2xl-orange-20 cursor-pointer bg-gray-10">
      <div className="text-center font-semibold text-bodyLg">
        {get(item, "itemName", "Ticket")}
      </div>
      {rewards && rewards.length > 0 && (
        <div className=" flex flex-wrap justify-center gap-x-4 mt-1 w-full scale-[0.8]">
          {rewards.map((reward, index) => (
            <InfoBox
              key={index}
              content={formatStringNumber(reward.value)}
              icon={{
                url: getIconPathByCurrencyType(reward.type),
              }}
            />
          ))}
        </div>
      )}
      <div
        className="h-[120px] w-full flex flex-col justify-center items-center bg-center bg-no-repeat bg-cover mt-2 rounded-lg relative"
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

        <div className="absolute top-1 right-2 text-center text-white text-[18px] font-extrabold drop-shadow-[0px_1px_black] text-stroke-[0.5px] text-stroke-[#6f6f6f] uppercase">
          {purchasedTimes}/{purchaseLimit}
        </div>
      </div>

      <Button
        customClassNames="!h-8 !w-[120px] mt-2 mb-1"
        disabled={isPurchaseDisabled}
        onClick={handlePurchaseClick}
      >
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
      </Button>
    </div>
  );
};
