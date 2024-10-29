import Button from "@/components/ui/Button";
import { SPIN_DURATION, SPIN_REVOLUTIONS } from "@/constants/mini-game";
import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { useUserStore } from "@/stores/userStore";
import { CURRENCY_TYPES } from "@/types/item";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import { getIconPathByCurrencyType } from "@/utils/shop";
import { get, random, sample, set } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Wheel } from "spin-wheel";
import { easeInOutCubic } from "easing-utils";

const items = [
  {
    label: "GOLD",
    currencyType: CURRENCY_TYPES.BEAN,
  },
  {
    label: "SPIN",
    currencyType: CURRENCY_TYPES.SPIN,
  },
  {
    label: "LOOT",
    currencyType: CURRENCY_TYPES.RAID,
  },
  {
    label: "GEM",
    currencyType: CURRENCY_TYPES.DIAMOND,
  },
  {
    label: "SHIELD",
    currencyType: CURRENCY_TYPES.SHIELD,
  },
  {
    label: "MISS",
  },
];
const props = {
  name: "DailySpin",
  debug: true,
  radius: 0.88,
  itemLabelRadius: 0.8,
  itemLabelColors: ["#000"],
  itemLabelFont: "Arial",
  itemLabelFontSizeMax: 25,
  itemLabelRotation: 90,
  itemLabelAlign: "center",
  lineWidth: 0,
  isInteractive: false,
  items,
  itemBackgroundColors: ["#B8A1ED", "#DED2F9"],
  rotationSpeed: 0.5,
  rotationSpeedMax: 300,
};

export const SpinWheelPanel = () => {
  const user = useUserStore((state) => state.user);
  const setCurrentModule = useMiniGameStore((state) => state.setCurrentModule);

  const wheelContainer = useRef();
  const [wheel, setWheel] = useState<any>();

  const spinTickets = get(user, "spinTickets", 0);

  const handleBackToHome = (e: any) => {
    if (wheel) wheel.remove();
    setCurrentModule(MINI_GAME_MODULES.HOME);
  };

  const removeWheel = () => {
    if (wheel) wheel.remove();
  };

  const handleSpinWheel = async () => {
    if (!wheel) return;
    console.log("wheel", wheel);
    const rewardIndex = random(0, items.length - 1);
    const reward = sample(items);
    // console.log("rewardIndex", rewardIndex);
    // wheel.spinToItem(
    //   2,
    //   SPIN_DURATION,
    //   true,
    //   SPIN_REVOLUTIONS,
    //   1,
    //   easeInOutCubic
    // );
    wheel.spin(1000);
  };

  useEffect(() => {
    if (wheelContainer.current) {
      const overlay = new Image();
      overlay.src = "/images/mini-game/SpinFrame.png";
      set(props, "overlayImage", overlay);

      const spinItems = get(props, "items", []);
      const mappedItems = spinItems.map((item) => {
        if (!item.currencyType) return item;
        const image = new Image();
        const imgUrl = getIconPathByCurrencyType(item.currencyType);
        image.src = imgUrl;
        return {
          ...item,
          image,
          imageRadius: 0.55,
          imageScale:
            item.currencyType === CURRENCY_TYPES.BEAN ||
            item.currencyType === CURRENCY_TYPES.DIAMOND
              ? 0.9
              : 1.5,
        };
      });
      set(props, "items", mappedItems);
      const wheelTemp = new Wheel(wheelContainer.current, props);
      setWheel(wheelTemp);
    }
    // return removeWheel();
  }, [wheelContainer.current]);

  return (
    <div className="h-full w-full absolute top-0 right-0 p-4 bg-[url('/images/mini-game/Background.gif')] bg-no-repeat bg-cover">
      {/* <div className="absolute h-screen w-screen top-0 right-0">
        <img src={"/images/mini-game/Background.gif"} alt={"background"} />
      </div> */}
      <div className="flex justify-between mt-4">
        <div className="w-8 h-8 cursor-pointer" onClick={handleBackToHome}>
          <img src="/images/back.png" alt="cat pic" width={32} height={32} />
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
      <div className="text-white text-center text-3xl uppercase w-full absolute left-1/2 -translate-x-1/2 top-28">
        WHEEL OF FORTUNE
      </div>
      <div
        className="wheel-container !h-screen w-[320px] z-10 absolute top-6 left-1/2 -translate-x-1/2"
        ref={wheelContainer}
      ></div>
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
