import { useUserStore } from "@/stores/userStore";
import React from "react";
import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { useLayoutStore } from "@/stores/layoutStore";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import Image from "next/image";

export const InfoPanel = () => {
  const [user, fetchUser] = useUserStore((state) => [
    state.user,
    state.fetchUser,
  ]);
  const [currentModule, setCurrentModule] = useMiniGameStore((state) => [
    state.currentModule,
    state.setCurrentModule,
  ]);
  const show = useLayoutStore((state) => state.showMinigamePanel);

  const handleBackHome = () => {
    setCurrentModule(MINI_GAME_MODULES.HOME);
  };

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
            <div className="uppercase font-semibold">How to play</div>
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>

          <div className="flex flex-col items-center justify-between w-full bg-[#fffeec] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] overflow-y-auto mt-8">
            <div className="w-full relative">
              <img src="/images/mini-game/GeneralBanner.png" alt="" />
            </div>
            <div className="p-3 overflow-y-auto !font-normal text-orange-90">
              <p>
                Blast off into the galaxy with your crew! Navigate through
                space, test your luck with the cosmic wheel, raid other managers
                and go beyond the stars!
              </p>
              <ol className="space-y-2 list-decimal pl-4 mt-2">
                <li>
                  Players receive{" "}
                  <span className="text-black font-medium">
                    3 spin tickets and 1 raid ticket daily
                  </span>{" "}
                  . Additional tickets are available for purchase in the shop.
                </li>

                <li>
                  Spin the{" "}
                  <span className="text-black font-medium">
                    Wheel of Fortune
                  </span>{" "}
                  for a chance to win various rewards.
                </li>

                <li>
                  Use raid tickets to steal from other managers. A successful
                  raid will earn you{" "}
                  <span className="text-black font-medium">
                    10% of the target&apos;s current gold
                  </span>
                  , and your opponent will lose that amount of gold!.
                </li>

                <li>
                  What if your opponent has a shield and defend their restaurant
                  from your raid? You will still get a small gift from KatKafe
                  Team, which is{" "}
                  <span className="text-black font-medium">
                    1% of your opponent&apos;s current gold
                  </span>
                  !
                </li>

                <li>
                  A normal raid costs 1 ticket and targets random players. Super
                  raids cost 4 tickets but guarantee targeting top players - top
                  <span className="text-black font-medium ml-1">
                    1000 players
                  </span>{" "}
                  who have the most amount of Gold!
                </li>

                <li>
                  Each manager can have up to{" "}
                  <span className="text-black font-medium">3 shields</span> to
                  protect your restaurant from incoming raids.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
