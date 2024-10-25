import NumberFormatter from "@/components/ui/NumberFormat";
import { InnerInfoBox } from "@/components/ui/shop/InnerInfoBox";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useItemStore } from "@/stores/shop/itemStore";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { useUserStore } from "@/stores/userStore";
import { CURRENCY_TYPES, Item, ITEM_TYPES, PurchaseReward } from "@/types/item";
import React, { useState } from "react";
import Image from "next/image";
import { ShopItem } from "@/components/ui/shop/ShopItem";
import { useConfirmPurchaseStore } from "@/stores/shop/confirmPurchaseStore";
import { get } from "lodash";
import { createStarInvoice } from "@/requests/shop/item";
import {
  useOpenInvoice,
  useShowAlert,
} from "@zakarliuka/react-telegram-web-tools";

export const GemShopContent = () => {
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [showSnackbar] = useSnackBarStore((state) => [state.show]);
  const openInvoice = useOpenInvoice();
  const showAlert = useShowAlert();

  const [items, currentItem, setCurrentItem, setItems] = useItemStore(
    (state) => [
      state.items,
      state.currentItem,
      state.setCurrentItem,
      state.setItems,
    ]
  );

  const [showConfirmPurchase, closeConfirmPurchase] = useConfirmPurchaseStore(
    (state) => [state.show, state.close]
  );

  const starPackItems = items.filter((item) => item.type === ITEM_TYPES.STAR);

  const handleConfirmPurchase = (item: Item) => {
    const rewards = Object.entries(item.data).map(([type, value]) => ({
      type,
      value,
    })) as PurchaseReward[];

    showConfirmPurchase({
      content: "You will receive these rewards after purchase",
      icon: item.imgUrl,
      rewards,
      price: {
        type: CURRENCY_TYPES.STAR,
        value: item.starPrice.toString(),
      },
      onConfirm: () => handleProcessStarPurchase(item),
    });
  };

  const handleProcessStarPurchase = async (item: Item) => {
    showLoading();
    try {
      const res = await createStarInvoice(item._id);
      const invoiceUrl = get(res, "invoiceLink");
      if (!invoiceUrl) {
        showSnackbar("Failed to create invoice!");
        return;
      }
      await openInvoice(invoiceUrl);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to create invoice!");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="bg-orange-10 rounded-b-[20px] flex flex-col items-center justify-start rounded-t border border-gray-20 w-full overflow-y-auto h-[calc(100%-32px)] p-4 mt-8">
      <InnerInfoBox
        key="branchSPD"
        content={user ? <NumberFormatter value={Number(user.diamond)} /> : "0"}
        icon={{
          url: "/images/kbuck.png",
        }}
      />
      <div className="w-full grid grid-cols-2 gap-2 mt-4">
        {starPackItems.map((item) => (
          <ShopItem
            item={item}
            key={item._id}
            onPurchase={() => handleConfirmPurchase(item)}
            currencyType={CURRENCY_TYPES.STAR}
          />
        ))}
      </div>
    </div>
  );
};
