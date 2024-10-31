import NumberFormatter from "@/components/ui/NumberFormat";
import { InnerInfoBox } from "@/components/ui/shop/InnerInfoBox";
import { buyItem, getItems } from "@/requests/shop/item";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useUserStore } from "@/stores/userStore";
import { CURRENCY_TYPES, Item, ITEM_TYPES, PurchaseReward } from "@/types/item";
import {
  getIconPathByCurrencyType,
  isUserHasEnoughCurrency,
} from "@/utils/shop";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { useLayoutStore } from "@/stores/layoutStore";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import { ShopItem } from "@/components/ui/shop/ShopItem";
import { useConfirmPurchaseStore } from "@/stores/shop/confirmPurchaseStore";
import Image from "next/image";
import { useSnackBarStore } from "@/stores/SnackBarStore";

export const ShopPanel = () => {
  const [user, fetchUser] = useUserStore((state) => [
    state.user,
    state.fetchUser,
  ]);
  const [currentModule, setCurrentModule] = useMiniGameStore((state) => [
    state.currentModule,
    state.setCurrentModule,
  ]);
  const show = useLayoutStore((state) => state.showMinigamePanel);
  const showSnackbar = useSnackBarStore((state) => state.show);
  const showConfirmPurchase = useConfirmPurchaseStore((state) => state.show);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      showLoading();
      const promises = [
        getItems(ITEM_TYPES.RAID),
        getItems(ITEM_TYPES.SHIELD),
        getItems(ITEM_TYPES.SPIN),
      ];
      const [raidItems, shieldItems, spinItems] = await Promise.all(promises);
      setItems([...raidItems, ...spinItems, ...shieldItems]);
    } catch (error) {
      console.error("Failed to fetch cat deals", error);
    } finally {
      hideLoading();
    }
  };

  const handleConfirmPurchase = (item: Item) => {
    showConfirmPurchase({
      content: "Are you sure to purchase this item?",
      icon: item.imgUrl,
      price: {
        type: CURRENCY_TYPES.DIAMOND,
        value: item.diamondPrice.toString(),
      },
      onConfirm: () => handleBuyItem(item),
    });
  };

  const handleBuyItem = async (item: Item) => {
    if (!user || !item) return;
    if (!isUserHasEnoughCurrency(user, item, CURRENCY_TYPES.DIAMOND)) {
      showSnackbar("Not enough diamond!");
      return;
    }
    showLoading();
    try {
      const body = {
        itemId: item._id,
        currencyType: CURRENCY_TYPES.DIAMOND,
      };
      const response = await buyItem(body);
      if (response) {
        await fetchUser();
        showSnackbar("Purchase successfully!");
      }
    } catch (error) {
      console.error("Failed to buy item", error);
      showSnackbar("Purchase fail!");
    } finally {
      hideLoading();
    }
  };

  const handleBackHome = () => {
    setCurrentModule(MINI_GAME_MODULES.HOME);
  };

  useEffect(() => {
    if (show && currentModule === MINI_GAME_MODULES.SHOP) fetchItems();
  }, [show, currentModule]);

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="absolute top-6 left-4 bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
        <Image
          src="/images/back.png"
          alt="cat pic"
          width={32}
          height={32}
          onClick={handleBackHome}
        />
      </div>
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px-64px)] mt-16">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            <div className="uppercase font-semibold">Mini shop</div>
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>

          <div className="flex flex-col items-center justify-between w-full bg-[#fffeec] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] overflow-y-auto mt-8 p-3">
            <div className="grid grid-cols-2 w-full gap-4 px-4">
              <InnerInfoBox
                key="diamond"
                content={
                  user ? (
                    <NumberFormatter value={Number(get(user, "diamond", 0))} />
                  ) : (
                    "0"
                  )
                }
                icon={{
                  url: getIconPathByCurrencyType(CURRENCY_TYPES.DIAMOND),
                }}
              />
              <InnerInfoBox
                key="shield"
                content={<NumberFormatter value={get(user, "shield", 0)} />}
                icon={{
                  url: getIconPathByCurrencyType(CURRENCY_TYPES.SHIELD),
                }}
              />
              <InnerInfoBox
                key="raidTicket"
                content={<NumberFormatter value={get(user, "raid", 0)} />}
                icon={{
                  url: getIconPathByCurrencyType(CURRENCY_TYPES.RAID),
                }}
              />
              <InnerInfoBox
                key="spinTicket"
                content={<NumberFormatter value={get(user, "spin", 0)} />}
                icon={{
                  url: getIconPathByCurrencyType(CURRENCY_TYPES.SPIN),
                }}
              />
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-4">
              {items.map((item) => (
                <ShopItem
                  item={item}
                  key={item._id}
                  onPurchase={() => handleConfirmPurchase(item)}
                  currencyType={CURRENCY_TYPES.DIAMOND}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
