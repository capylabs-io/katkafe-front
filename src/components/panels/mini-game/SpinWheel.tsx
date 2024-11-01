import Button from "@/components/ui/Button";
import {
  SPIN_REVOLUTIONS,
  SPIN_WHEEL_ITEM_COLORS,
} from "@/constants/mini-game";
import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { useUserStore } from "@/stores/userStore";
import { CURRENCY_TYPES } from "@/types/item";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import { getIconPathByCurrencyType } from "@/utils/shop";
import { get } from "lodash";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SpinWheel, SpinWheelRef } from "./Wheel";
import { WheelItem } from "@/types/spin-wheel";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { getWheelConfig, spinWheel } from "@/requests/mini-game/mini-game";
import { currencyTypeToLabel } from "@/utils/spin";
import { usePurchaseRewardStore } from "@/stores/shop/purchaseRewardStore";

export const SpinWheelPanel = () => {
  const [items, setItems] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinReward, setSpinReward] = useState<any>();

  const [user, fetchUser] = useUserStore((state) => [
    state.user,
    state.fetchUser,
  ]);
  const setCurrentModule = useMiniGameStore((state) => state.setCurrentModule);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const showSnackbar = useSnackBarStore((state) => state.show);
  const showReward = usePurchaseRewardStore((state) => state.show);

  const spinWheelRef = useRef<SpinWheelRef>(null);

  const spinTickets = get(user, "spin", 0);

  const handleBackToHome = (e: any) => {
    if (isSpinning) {
      showSnackbar("The Wheel is spinning!");
      return;
    }
    setCurrentModule(MINI_GAME_MODULES.HOME);
  };

  const handleSpinWheel = async () => {
    if (!spinTickets || spinTickets < 1) {
      showSnackbar("Not enough spin ticket!");
      return;
    }
    if (isSpinning) {
      showSnackbar("The Wheel is spinning!");
      return;
    }
    try {
      showLoading();
      const res = await spinWheel();
      const result = get(res, "result");
      console.log("items", items);
      console.log("res", res);
      console.log("result", result);
      if (result) {
        const reward = get(result, "rewards[0]");
        console.log("reward", reward);
        setSpinReward(reward);
        const winningItemIndex = items.findIndex(
          (item) => get(item, "id", -1) === result.id
        );
        console.log("winningItemIndex", winningItemIndex);

        setIsSpinning(true);
        spinWheelRef.current.spinToItem(0, SPIN_REVOLUTIONS);
      }
    } catch (error) {
      console.error(error);
      showSnackbar("Spin fail!");
    } finally {
      hideLoading();
    }
  };

  const handleSpinWheelEnd = useCallback(async () => {
    console.log("spinReward", spinReward);
    setIsSpinning(false);
    if (!spinReward) {
      showSnackbar("Good luck next time!");
      return;
    }
    showSnackbar("Reward received");
    console.log("spinReward", spinReward);

    const currencyType = get(spinReward, "type", CURRENCY_TYPES.BEAN);
    showReward({
      title: "Congrats",
      content: "You have won these reward!",
      icon: getIconPathByCurrencyType(currencyType),
      rewards: [spinReward],
    });
    await fetchUser();
  }, [spinReward]);

  const handleFetchWheelConfig = async () => {
    try {
      showLoading();
      const res = await getWheelConfig();
      if (res && res.length > 0) {
        const mappedItems = res.map((itemConfig, index) => {
          let item = {
            ...itemConfig,
            label: itemConfig.label.toUpperCase(),
            color:
              SPIN_WHEEL_ITEM_COLORS[index % SPIN_WHEEL_ITEM_COLORS.length],
          } as any;
          const currencyType = get(itemConfig, "rewards[0].type");
          const rewardValue = get(itemConfig, "rewards[0].value", 0);
          if (currencyType) {
            item = {
              ...item,
              label: currencyTypeToLabel(currencyType).toUpperCase(),
              image: getIconPathByCurrencyType(currencyType),
              imageWidth: 32,
              imageHeight: 32,
              reward: {
                type: currencyType,
                value: rewardValue,
              },
            };
          }
          return item;
        }) as WheelItem[];
        setItems(mappedItems);
      } else {
        setItems([]);
      }
    } catch (error) {
      showSnackbar("Failed to fetch wheel config!");
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    handleFetchWheelConfig();
  }, []);

  return (
    <div className="h-full w-full absolute top-0 right-0 p-4 bg-[url('/images/mini-game/Background.gif')] bg-no-repeat bg-cover">
      <div className="flex justify-between mt-4">
        <div className="w-8 h-8 cursor-pointer">
          <img
            src="/images/back.png"
            alt="cat pic"
            width={32}
            height={32}
            onClick={handleBackToHome}
          />
        </div>
        <div className="flex gap-x-1.5">
          <div className="text-white text-2xl">{spinTickets}</div>
          <div className="pt-0.5">
            <img
              src={getIconPathByCurrencyType(CURRENCY_TYPES.SPIN)}
              width={24}
              height={24}
              alt={"icon"}
            />
          </div>
        </div>
      </div>
      <div className="text-white text-center text-3xl uppercase w-full absolute left-1/2 -translate-x-1/2 top-24">
        WHEEL OF FORTUNE
      </div>
      {items && items.length > 0 && (
        <div className="mt-24">
          <SpinWheel
            items={items}
            ref={spinWheelRef}
            onSpinEnd={handleSpinWheelEnd}
            pointerAngle={0}
            overlayImage={"/images/mini-game/SpinFrame.png"}
            radius={180}
          />
        </div>
      )}
      <div className="w-[156px] absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <Button onClick={handleSpinWheel}>
          <div className="flex items-center gap-x-1">
            <img
              src={getIconPathByCurrencyType(CURRENCY_TYPES.SPIN)}
              width={24}
              height={24}
              alt={"icon"}
            />
            <div className="text-lg uppercase font-semibold">Spin</div>
          </div>
        </Button>
      </div>
    </div>
  );
};
