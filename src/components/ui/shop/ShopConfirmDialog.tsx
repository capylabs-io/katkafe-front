import React from "react";
import Button from "../Button";
import { useConfirmPurchaseStore } from "@/stores/shop/confirmPurchaseStore";
import Image from "next/image";
import { getIconPathByCurrencyType } from "@/utils/shop";
import { ITEM_TYPES } from "@/types/item";
import { get } from "lodash";
import { InnerInfoBox } from "./InnerInfoBox";

export const ShopConfirmDialog = () => {
  const [
    close,
    isShowing,
    title,
    content,
    confirmText,
    cancelText,
    beforeConfirm,
    beforeClose,
    price,
    rewards,
    icon,
  ] = useConfirmPurchaseStore((state) => [
    state.close,
    state.isShowing,
    state.title,
    state.content,
    state.confirmText,
    state.cancelText,
    state.onConfirm,
    state.onClose,
    state.price,
    state.rewards,
    state.icon,
  ]);

  const handleClose = () => {
    beforeClose?.();
    close();
  };

  const handleConfirm = () => {
    beforeConfirm?.();
    close();
  };

  return (
    isShowing && (
      <>
        <div
          className="bg-[#807f76] opacity-70 absolute w-full h-full items-center flex justify-center top-0 left-0 !z-30"
          onClick={handleClose}
        ></div>
        <div className="bg-orange-10 absolute rounded-2xl w-[90%] text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !z-40">
          <div className="absolute -right-[6px] -top-[6px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="p-4">
            <div className="text-xl font-semibold">{title}</div>
            <div className="text-md text-gray-30 leading-5 mt-2">{content}</div>
            <div className="flex items-center justify-center">
              <Image src={icon} width={140} height={140} alt={"item-img"} />
            </div>
          </div>
          {rewards && rewards.length > 0 && (
            <div className="px-4 flex flex-wrap justify-center -mt-2 mb-6">
              {rewards.map((reward, index) => (
                <InnerInfoBox
                  key={index}
                  content={reward.value}
                  icon={{
                    url: getIconPathByCurrencyType(reward.type),
                  }}
                />
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3">
            {/* <div className="w-[164px] h-[39px]" onClick={handleClose}>
              <Button>{cancelText}</Button>
            </div>*/}

            <div className="w-[164px] h-[39px]" onClick={handleConfirm}>
              <Button>
                <div className="flex items-center gap-x-1">
                  <div>
                    <Image
                      src={getIconPathByCurrencyType(price.type)}
                      alt={"currency-icon"}
                      width={16}
                      height={16}
                    />
                  </div>
                  <div>{price.value}</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  );
};
