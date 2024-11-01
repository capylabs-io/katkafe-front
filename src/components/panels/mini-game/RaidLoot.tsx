import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { useUserStore } from "@/stores/userStore";
import { CURRENCY_TYPES } from "@/types/item";
import { MINI_GAME_MODULES, RAID_TYPES } from "@/types/mini-game";
import {
  getBigIconPathByCurrencyType,
  getIconPathByCurrencyType,
} from "@/utils/shop";
import { get } from "lodash";
import React, { useState } from "react";
import Image from "next/image";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { useConfirmPurchaseStore } from "@/stores/shop/confirmPurchaseStore";
import { raidUser } from "@/requests/mini-game/mini-game";
import { MINIMUM_SEARCH_TIME, RAID_COST } from "@/constants/mini-game";
import { waitForSeconds } from "@/utils/helpers";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { UserType } from "@/types/user";
import { OpponentPanel } from "./OpponentPanel";

export const RaidPanel = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [raidType, setRaidType] = useState<string>(RAID_TYPES.RAID);
  const [showOpponentPanel, setShowOpponentPanel] = useState(false);
  const [currentOpponent, setCurrentOpponent] = useState<UserType>();

  const [user, fetchUser] = useUserStore((state) => [
    state.user,
    state.fetchUser,
  ]);
  const setCurrentRestaurant = useRestaurantStore(
    (state) => state.setCurrentRestaurant
  );
  const [setCurrentModule, setRaidRestaurant, setRaidResult, setRaidUser] =
    useMiniGameStore((state) => [
      state.setCurrentModule,
      state.setRaidRestaurant,
      state.setRaidResult,
      state.setRaidUser,
    ]);
  const show = useSnackBarStore((state) => state.show);
  const showConfirmPurchase = useConfirmPurchaseStore((state) => state.show);

  const raidTickets = get(user, "raid", 0);

  const handleBackToHome = (e: any) => {
    setCurrentModule(MINI_GAME_MODULES.HOME);
  };

  const handleConfirmSearch = (type: string) => {
    if (isSearching) return;
    if (type !== RAID_TYPES.RAID && type !== RAID_TYPES.SRAID) {
      show("Invalid raid type"!);
      return;
    }

    showConfirmPurchase({
      title: "Start Raid",
      content: `Are you sure to start a ${type}?`,
      icon: getBigIconPathByCurrencyType(CURRENCY_TYPES.RAID),
      price: {
        type: CURRENCY_TYPES.RAID,
        value: type === RAID_TYPES.RAID ? "1" : "4",
      },
      onConfirm: () => handleSearch(type),
    });
  };

  const handleSearch = async (type: string) => {
    if (type === RAID_TYPES.RAID && raidTickets < RAID_COST) {
      show("Not enough raid tickets"!);
      return;
    }

    if (type === RAID_TYPES.SRAID && raidTickets < RAID_COST) {
      show("Not enough raid tickets"!);
      return;
    }
    try {
      setIsSearching(true);
      setRaidType(type);
      //TODO: fetch result and restaurant here
      // Currently, we don't have the API for this feature
      // So, we just set the result to a random value
      const res = await raidUser(type === RAID_TYPES.SRAID);
      await fetchUser();
      await waitForSeconds(MINIMUM_SEARCH_TIME);
      console.log("res", res);

      const raidPlayer = get(res, "raidedUser");
      const raidRestaurant = get(res, "location");
      const raidResult = get(res, "result");

      if (res && raidRestaurant && raidPlayer && raidResult) {
        show("Raid started successfully"!);
        setRaidRestaurant(raidRestaurant);
        setRaidResult(raidResult);
        setRaidUser(raidPlayer);

        //Show opponent panel
        setShowOpponentPanel(true);
        setCurrentOpponent(raidPlayer);
        await waitForSeconds(3);

        //Change scene to raiding
        setCurrentModule(MINI_GAME_MODULES.RAIDING);
        setCurrentRestaurant(raidRestaurant);
      } else {
        show("Failed to start raid"!);
      }
    } catch (error) {
      show("Failed to start raid"!);
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <div className="h-full w-full absolute top-0 right-0 p-4 bg-[url('/images/mini-game/Background.gif')] bg-no-repeat bg-cover">
        <div className="flex justify-between mt-4">
          <div className="w-8 h-8 cursor-pointer" onClick={handleBackToHome}>
            <img src="/images/back.png" alt="cat pic" width={32} height={32} />
          </div>
          <div className="flex gap-x-1.5">
            <div className="text-white text-2xl">{raidTickets}</div>
            <div className="pt-0.5">
              <img
                src={getIconPathByCurrencyType(CURRENCY_TYPES.RAID)}
                width={24}
                height={24}
                alt={"icon"}
              />
            </div>
          </div>
        </div>
        <div className="text-white text-center text-3xl uppercase w-full absolute left-1/2 -translate-x-1/2 top-24">
          Galaxy raid
        </div>
        <div className="w-[340px] h-[408px] bg-contain left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[url('/images/mini-game/Frame.png')] relative">
          <div className="absolute top-7 text-center text-white text-2xl uppercase left-1/2 -translate-x-1/2 w-fit">
            {!isSearching ? "Ready to go?" : `Searching for ${raidType}...`}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-24">
            {isSearching ? (
              <Image
                width={164}
                height={164}
                src={"/images/mini-game/Search.gif"}
                alt={"search-gif"}
              />
            ) : (
              <Image
                width={164}
                height={164}
                src={"/images/mini-game/Idle.png"}
                alt={"search-gif"}
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-center w-full absolute bottom-6 gap-y-2">
            <div
              onClick={() => handleConfirmSearch(RAID_TYPES.RAID)}
              className="h-10 w-[180px] text-white text-xl bg-contain bg-no-repeat flex justify-center items-center gap-x-1 bg-[url('/images/mini-game/SearchFrame.png')] bg-center cursor-pointer"
            >
              <div>1</div>
              <Image
                width={24}
                height={24}
                src={getIconPathByCurrencyType(CURRENCY_TYPES.RAID)}
                alt={"ic-raid"}
              />
              <div>RAID</div>
            </div>
            <div
              onClick={() => handleConfirmSearch(RAID_TYPES.SRAID)}
              className="h-10 w-[180px] text-white text-xl bg-contain bg-no-repeat flex justify-center items-center gap-x-1 bg-[url('/images/mini-game/SearchFrame.png')] bg-center cursor-pointer"
            >
              <div>4</div>
              <Image
                width={24}
                height={24}
                src={getIconPathByCurrencyType(CURRENCY_TYPES.RAID)}
                alt={"ic-raid"}
              />
              <div>S-RAID</div>
            </div>
          </div>
        </div>
      </div>
      {showOpponentPanel && <OpponentPanel user={currentOpponent} />}
    </>
  );
};
