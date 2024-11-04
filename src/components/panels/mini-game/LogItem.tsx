import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { useUserStore } from "@/stores/userStore";
import {
  getBigIconPathByCurrencyType,
  getIconPathByCurrencyType,
} from "@/utils/shop";
import { CURRENCY_TYPES } from "@/types/item";
import { formatStringNumber, timeAgo, waitForSeconds } from "@/utils/helpers";
import moment from "moment";
import { MINI_GAME_MODULES, RaidLog } from "@/types/mini-game";
import Button from "@/components/ui/Button";
import { useConfirmPurchaseStore } from "@/stores/shop/confirmPurchaseStore";
import { REVENGE_COST } from "@/constants/mini-game";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { revengeRaid } from "@/requests/mini-game/mini-game";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";

type Props = {
  log: RaidLog;
};

export const LogItem = ({ log }: Props) => {
  const [user, fetchUser] = useUserStore((state) => [
    state.user,
    state.fetchUser,
  ]);
  const showConfirmPurchase = useConfirmPurchaseStore((state) => state.show);
  const showSnackbar = useSnackBarStore((state) => state.show);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
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

  const userTickets = get(user, "raid", 0);
  const isBlocked = get(log, "status", "success") === "blocked";
  const isRevenged = get(log, "isRevenged", false);
  const isRaided = get(log, "raidedUser._id") === user._id;

  const isRevengedLog = get(log, "type", "kat-raid") === "kat-raid-revenge";

  const getBackgroundColor = () => {
    if (isBlocked)
      //blocked
      return "#FFEDBB";
    else if (isRaided && !isBlocked)
      //was raided
      return "#E2645C";
    //raided success
    else return "#BBE76C";
  };

  const handleConfirmRevenge = async (logId: string) => {
    showConfirmPurchase({
      title: "Revenge",
      content: `Are you sure to take your revenge?`,
      icon: getBigIconPathByCurrencyType(CURRENCY_TYPES.RAID),
      price: {
        type: CURRENCY_TYPES.RAID,
        value: REVENGE_COST.toString(),
      },
      onConfirm: () => handleRevenge(logId),
    });
  };

  const handleRevenge = async (logId: string) => {
    if (userTickets <= REVENGE_COST) {
      showSnackbar("Not enough raid tickets!");
      return;
    }
    try {
      showLoading();
      const res = await revengeRaid(logId);
      await fetchUser();

      const raidPlayer = get(res, "raidedUser");
      const raidRestaurant = get(res, "location");
      const raidResult = get(res, "result");

      if (res && raidRestaurant && raidPlayer && raidResult) {
        showSnackbar("Raid started successfully"!);
        setRaidRestaurant(raidRestaurant);
        setRaidResult(raidResult);
        setRaidUser(raidPlayer);

        //Change scene to raiding
        setCurrentModule(MINI_GAME_MODULES.RAIDING);
        setCurrentRestaurant(raidRestaurant);
      } else {
        showSnackbar("Failed to start raid"!);
      }
    } catch (error) {
      showSnackbar("Failed to start raid"!);
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  const renderContent = () => {
    if (isRaided && isBlocked) {
      return (
        <div className="flex flex-col">
          <div>
            Blocked{" "}
            <span className="font-medium text-black">
              {get(log, "user.username", "Your Opponent")}
            </span>
          </div>
        </div>
      );
    } else if (isRaided && !isBlocked) {
      return (
        <div className="flex flex-col">
          <div>
            Raided by{" "}
            <span className="font-medium text-black">
              {get(log, "user.username", "Your Opponent")}
            </span>
          </div>
          <div className="flex gap-x-1 items-center">
            Lost{" "}
            <span className="font-medium text-black">
              {formatStringNumber(get(log, "beanReward", "0"))}
            </span>
            <div>
              <Image
                src={getIconPathByCurrencyType(CURRENCY_TYPES.BEAN)}
                alt={"ic-gold"}
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col">
          <div>
            {isRevengedLog ? "Revenged" : "Raided"}{" "}
            <span className="font-medium text-black">
              {get(log, "raidedUser.username", "Your Opponent")}
            </span>
          </div>
          <div className="flex gap-x-1 items-center">
            Gained{" "}
            <span className="font-medium text-black">
              {formatStringNumber(get(log, "beanReward", "0"))}
            </span>
            <div>
              <Image
                src={getIconPathByCurrencyType(CURRENCY_TYPES.BEAN)}
                alt={"ic-gold"}
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-2 pt-3 relative">
      <div className="flex justify-between items-center">
        <div
          className="flex items-center justify-center w-7 h-7 rounded-full"
          style={{
            backgroundColor: getBackgroundColor(),
          }}
        >
          <Image
            src={
              isBlocked
                ? getIconPathByCurrencyType(CURRENCY_TYPES.SHIELD)
                : "/icons/ic-raid.png"
            }
            width={20}
            height={20}
            alt="ic-icon"
          />
        </div>
        <div className="text-orange-90 text-bodyMd">
          {timeAgo(get(log, "createdAt", moment.utc().toISOString()))}
        </div>
      </div>
      <div className="text-orange-90 text-bodyMd">{renderContent()}</div>
      {isRaided && (
        <div className="absolute bottom-0 right-0">
          <Button
            customClassNames="!min-h-8 !px-2 text-bodyMd"
            onClick={() => handleConfirmRevenge(log._id)}
            disabled={isRevenged}
          >
            {!isRevenged ? "Revenge" : "Revenged"}
          </Button>
        </div>
      )}
    </div>
  );
};
