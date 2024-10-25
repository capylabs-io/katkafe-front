import { EVENT_BUS_TYPES, UI_BUTTON } from "@/constants/events";
import { EventBus } from "@/game/EventBus";
import { useLayoutStore } from "@/stores/layoutStore";

export const useEventBus = () => {
  const [
    setShowQuestPanel,
    setShowLeaderboardPanel,
    setShowRollPanel,
    setShowGuildPanel,
    setShowFriendPanel,
    isAnyPanelOpen,
  ] = useLayoutStore((state) => [
    state.setShowQuestPanel,
    state.setShowLeaderboardPanel,
    state.setShowRollPanel,
    state.setShowGuildPanel,
    state.setShowFriendPanel,
    state.isAnyPanelOpen,
  ]);

  const registerUIButtonClicked = () => {
    EventBus.on(EVENT_BUS_TYPES.UI_BUTTON_CLICK, (uiButton: string) => {
      if (isAnyPanelOpen) return;
      switch (uiButton) {
        case UI_BUTTON.FRIEND:
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
          setShowQuestPanel(true);
          break;
        case UI_BUTTON.RANK:
          setShowLeaderboardPanel(true);
          break;
      }
    });
  };

  const registerEventListeners = () => {
    registerUIButtonClicked();
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
