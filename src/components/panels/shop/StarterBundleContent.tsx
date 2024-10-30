import NumberFormatter from "@/components/ui/NumberFormat";
import { InnerInfoBox } from "@/components/ui/shop/InnerInfoBox";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useItemStore } from "@/stores/shop/itemStore";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { useUserStore } from "@/stores/userStore";
import { CURRENCY_TYPES, Item, ITEM_TYPES, PurchaseReward } from "@/types/item";
import React from "react";
import { useConfirmPurchaseStore } from "@/stores/shop/confirmPurchaseStore";
import { get } from "lodash";
import { createStarInvoice } from "@/requests/shop/item";
import { useOpenInvoice } from "@zakarliuka/react-telegram-web-tools";
import { getIconPathByCurrencyType } from "@/utils/shop";
import moment from "moment";
import { BundleItem } from "@/components/ui/shop/BundleItem";
import { STARTER_DATE } from "@/constants/shop";

type Props = {
  onPurchase?: () => Promise<Item[]>;
};
export const StarterBundleShopContent = ({ onPurchase }: Props) => {
  const [user, fetchUser] = useUserStore((state) => [
    state.user,
    state.fetchUser,
  ]);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [showSnackbar] = useSnackBarStore((state) => [state.show]);
  const openInvoice = useOpenInvoice();

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

  const starPackItems = items.filter(
    (item) => item.type === ITEM_TYPES.STARTER_BUNDLE
  );

  const handleConfirmPurchase = (item: Item) => {
    const rewards = Object.entries(item.data).map(([type, value]) => ({
      type,
      value,
    })) as PurchaseReward[];

    showConfirmPurchase({
      title: "Confirm Purchase",
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
      await fetchUser();
      if (onPurchase) await onPurchase();
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to create invoice!");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="bg-orange-10 rounded-b-[20px] flex flex-col items-center justify-start rounded-t border border-gray-20 w-full overflow-y-auto h-[calc(100%-32px)] p-4 mt-8">
      <div className="flex items-center gap-x-4">
        <InnerInfoBox
          key="bean"
          content={<NumberFormatter value={Number(get(user, "diamond", 0))} />}
          icon={{ url: getIconPathByCurrencyType(CURRENCY_TYPES.DIAMOND) }}
        />
        <InnerInfoBox
          key="diamond"
          content={<NumberFormatter value={Number(get(user, "bean", 0))} />}
          icon={{
            url: getIconPathByCurrencyType(CURRENCY_TYPES.BEAN),
          }}
        />
      </div>
      <div className="text-bodyMd mt-3">
        All users participated after
        <span className="font-semibold mx-0.5">
          {moment(STARTER_DATE, "YYYY-MM-DD").format("MM/DD/YYYY")}
        </span>{" "}
        will be eligible to buy our Starter Bundle as a{" "}
        <span className="font-medium">Welcome Gift</span> from{" "}
        <span className="font-medium">KatKafe Team!</span>
      </div>
      <div className="w-full flex flex-col gap-3 mt-4 px-4">
        {starPackItems.map((item) => (
          <BundleItem
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
