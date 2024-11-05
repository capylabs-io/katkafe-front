import { EVENT_BUS_TYPES, UI_BUTTON } from "@/constants/events";
import { EventBus } from "@/game/EventBus";
import { useLayoutStore } from "@/stores/layoutStore";
import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { usePurchaseRewardStore } from "@/stores/shop/purchaseRewardStore";
import { CURRENCY_TYPES } from "@/types/item";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import { get } from "lodash";

export const useEventBus = () => {
  const [
    setShowQuestPanel,
    setShowLeaderboardPanel,
    setShowRollPanel,
    setShowGuildPanel,
    setShowFriendPanel,
    setShowErrorPanel,
    isAnyPanelOpen,
  ] = useLayoutStore((state) => [
    state.setShowQuestPanel,
    state.setShowLeaderboardPanel,
    state.setShowRollPanel,
    state.setShowGuildPanel,
    state.setShowFriendPanel,
    state.setShowErrorPanel,
    state.isAnyPanelOpen,
  ]);

  const [raidUser, raidRestaurant, raidResult, setCurrentModule] =
    useMiniGameStore((state) => [
      state.raidUser,
      state.raidRestaurant,
      state.raidResult,
      state.setCurrentModule,
    ]);
  const showResult = usePurchaseRewardStore((state) => state.show);
  const [setMiniGamePanel] = useLayoutStore((state) => [
    state.setMiniGamePanel,
  ]);
  const [myRestaurants, setCurrentRestaurant] = useRestaurantStore((state) => [
    state.myRestaurants,
    state.setCurrentRestaurant,
  ]);

  const isBlocked = get(raidResult, "status", "success") === "blocked";

  const registerUIButtonClicked = () => {
    EventBus.on(EVENT_BUS_TYPES.UI_BUTTON_CLICK, (uiButton: string) => {
      if (isAnyPanelOpen) return;
      switch (uiButton) {
        case UI_BUTTON.FRIEND:
          console.log("Friend button clicked");
          setShowFriendPanel(true);
          break;
        // case UI_BUTTON.GACHA:
        //   console.log("Gacha button clicked");
        //   setShowRollPanel(true);
        //   break;
        // case UI_BUTTON.GUIDE:
        //   console.log("Guide button clicked");
        //   setShowGuildPanel(true);
        //   break;
        case UI_BUTTON.QUEST:
          console.log("Quest button clicked");
          setShowQuestPanel(true);
          break;
        case UI_BUTTON.RANK:
          console.log("Rank button clicked");
          setShowLeaderboardPanel(true);
          break;
      }
    });
  };

  const handleShowRaidResult = () => {
    if (!raidResult) return;

    console.log("showResult");
    showResult({
      title: isBlocked ? "Unsuccessful Raid" : "Raid Success",
      content: !isBlocked ? (
        <div>
          You have looted some gold successfully from{" "}
          <span className="font-semibold">
            {get(raidUser, "username", "Your Opponent")}
          </span>
        </div>
      ) : (
        <div>
          <span className="font-semibold">
            {get(raidUser, "username", "Your Opponent")}
          </span>{" "}
          has defended their restaurant successfully! You only got some small
          gift.
        </div>
      ),
      rewards: [
        {
          type: CURRENCY_TYPES.BEAN,
          value: get(raidResult, "beanReward", 0),
        },
      ],
      onConfirm: handleBackToHome,
    });
  };

  const handleBackToHome = () => {
    setMiniGamePanel(true);
    setCurrentModule(MINI_GAME_MODULES.HOME);
    if (myRestaurants.length > 0) {
      setCurrentRestaurant(myRestaurants[myRestaurants.length - 1]);
    }
  };

  const registerEventListeners = () => {
    registerUIButtonClicked();
    EventBus.on(EVENT_BUS_TYPES.IN_GAME_ERROR, () => {
      setShowErrorPanel(true);
    });
    EventBus.on(EVENT_BUS_TYPES.SHOW_RAID_RESULT, handleShowRaidResult);
  };

  const onGameSceneReady = async () => {
    // EventBus.emit(EVENT_BUS_TYPES.CHOOSE_RESTAURANT);
  };

  const removeAllEventListeners = () => {
    EventBus.removeAllListeners();
  };

  const removeEventListener = (eventName: string) => {
    EventBus.removeListener(eventName);
  };

  return {
    registerEventListeners,
    removeAllEventListeners,
    removeEventListener,
    onGameSceneReady,
  };
};
