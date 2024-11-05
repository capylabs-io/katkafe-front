import { useLayoutStore } from "@/stores/layoutStore";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/common/Card";
import { LEADERBOARDS } from "@/constants/leaderboard";
import { MINI_GAME_PANELS } from "@/constants/mini-game";
import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { InnerInfoBox } from "@/components/ui/shop/InnerInfoBox";
import NumberFormatter from "@/components/ui/NumberFormat";
import { CURRENCY_TYPES } from "@/types/item";
import { getIconPathByCurrencyType } from "@/utils/shop";
import { get } from "lodash";
import { useUserStore } from "@/stores/userStore";
import { LogPanel } from "./LogPanel";

const TAB = {
  HOME: "Home",
  NOTI: "Noti",
};
const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";

export const HomePanel = () => {
  const [activeTab, setActiveTab] = useState(TAB.HOME);

  const user = useUserStore((state) => state.user);
  const [setMiniGamePanel] = useLayoutStore((state) => [
    state.setMiniGamePanel,
  ]);

  const [setCurrentModule] = useMiniGameStore((state) => [
    state.setCurrentModule,
  ]);

  const handleClose = () => {
    setMiniGamePanel(false);
  };

  const handleChangeGameModule = (module: string) => {
    setCurrentModule(module);
  };

  const tabs = (
    <div className="absolute flex gap-x-4 -translate-x-1/2 left-1/2 items-end">
      <div
        onClick={() => setActiveTab(TAB.HOME)}
        className={`cursor-pointer border-b-0 border-2 py-1 px-6 bg-[#edc6a9] border-[#edc6a9] -translate-y-[28px] rounded-t-xl text-orange-90 ${
          activeTab === TAB.HOME ? isActive : ""
        }`}
      >
        Game
      </div>
      <div
        onClick={() => setActiveTab(TAB.NOTI)}
        className={`cursor-pointer border-b-0 border-2 py-1 px-6 bg-[#edc6a9] border-[#edc6a9] -translate-y-[28px] rounded-t-xl text-orange-90 ${
          activeTab === TAB.NOTI ? isActive : ""
        }`}
      >
        Log
      </div>
    </div>
  );

  const homeContent = (
    <div className="flex flex-col w-full bg-[#fffeec] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 !h-[calc(100%-32px)] overflow-hidden mt-8">
      {/* <Slider ranks={[]} /> */}
      <div className="flex flex-col w-full overflow-auto">
        <div className="w-full relative">
          <img src="/images/mini-game/Banner.png" alt="" />
        </div>

        <div className="grid grid-cols-3 px-3 pt-3 gap-x-3">
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

        <div className="overflow-y-auto w-full grid grid-cols-2 justify-center gap-3 mx-auto p-3">
          {Object.values(MINI_GAME_PANELS).map((item) => (
            <Card
              key={item.key}
              className="border border-gray-20 rounded-xl p-2 drop-shadow-[0_2px_#b5b5b5] cursor-pointer bg-gray-10"
              onClick={() => handleChangeGameModule(item.module)}
            >
              <CardContent className="p-0">
                <div className="w-full bg-[url('/images/leaderboard/pattern.png')] bg-cover rounded-md h-20 flex justify-center items-center">
                  <Image
                    width={80}
                    height={80}
                    src={`/images/mini-game/${item.key}.png`}
                    alt=""
                    className="mx-auto drop-shadow-2xl"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-0 mt-2">
                <div className="flex justify-center w-full">
                  <div className="text-sm uppercase">{item.value}</div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      default:
      case TAB.HOME:
        return homeContent;
      case TAB.NOTI:
        return <LogPanel />;
    }
  };

  return (
    <>
      <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
        <div className="rounded-3xl border-solid border-orange-90 border-4 !h-[calc(100%-36px)] mt-6">
          <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
            <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
              <Image
                src="/images/btn-close.png"
                alt=""
                onClick={handleClose}
                width={24}
                height={24}
              />
            </div>
            {tabs}

            <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
              <p className="bg-red-10 h-[2px] w-[13%]"></p>
              <p className="bg-red-10 h-[2px] w-[70%]"></p>
              <p className="bg-red-10 h-[2px] w-[13%]"></p>
            </span>

            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  );
};
