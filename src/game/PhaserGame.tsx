import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import { InGameUI } from "@/components/ui/InGameUI";
import { useLayoutStore } from "@/stores/layoutStore";

import Staff from "@/components/panels/staff/UserStaffList";
import Manage from "@/components/panels/manage/Manage";
import Shop from "@/components/panels/shop/Shop";
// import Friend from "@/components/panels/friend/Friend";
import { FriendPanel } from "@/components/panels/friend/FriendPanel";
import { EVENT_BUS_TYPES } from "@/constants/events";
import { useEventBus } from "@/lib/hooks/useEventBus";
import { LeaderboardPanel } from "@/components/panels/leaderboard/LeaderboardPanel";
import InviteInfo from "@/components/panels/invite/InviteInfo";
import Guild from "@/components/panels/guild/Guild";
import FindGuild from "@/components/panels/guild/FindGuildPanel";
import GuildDetail from "@/components/panels/guild/GuildDetailPanel";
import Roll from "@/components/panels/roll/Roll";
import Task from "@/components/panels/quest/Quest";
import Restaurant from "@/components/panels/restaurant/Restaurant";
import { useLoadingStore } from "@/stores/LoadingStore";
import { Loading } from "@/components/ui/Loading";
import SnackBar from "@/components/ui/common/SnackBar";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import Boost from "@/components/panels/boost/Boost";
import EventPanel from "@/components/panels/event/Event";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

export const PhaserGame = forwardRef<IRefPhaserGame>(function PhaserGame(
  props,
  ref
) {
  const game = useRef<Phaser.Game | null>(null);

  const [isGameScene, setIsGameScene] = useState(false);
  const { registerEventListeners, removeAllEventListeners } = useEventBus();

  const [
    showFriendPanel,
    showManagePanel,
    showStaffPanel,
    showShopPanel,
    showInviteInfoPanel,
    showGuildPanel,
    showFindGuildPanel,
    showRollPanel,
    showQuestPanel,
    showLeaderboardPanel,
    showGuildDetailPanel,
    showRestaurantPanel,
    showBoostPanel,
    showEventPanel,
    showRewardPanel,
  ] = useLayoutStore((state) => [
    state.showFriendPanel,
    state.showManagePanel,
    state.showStaffPanel,
    state.showShopPanel,
    state.showInviteInfoPanel,
    state.showGuildPanel,
    state.showFindGuildPanel,
    state.showRollPanel,
    state.showQuestPanel,
    state.showLeaderboardPanel,
    state.showGuildDetailPanel,
    state.showRestaurantPanel,
    state.showBoostPanel,
    state.showEventPanel,
    state.showRewardPanel,
  ]);

  const [isShowingLoading] = useLoadingStore((state) => [state.isShowing]);
  const [isShowingSnackbar] = useSnackBarStore((state) => [state.isShowing]);

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = StartGame("game-container");

      if (typeof ref === "function") {
        ref({ game: game.current, scene: null });
      } else if (ref) {
        ref.current = { game: game.current, scene: null };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    EventBus.on(EVENT_BUS_TYPES.SCENE_READY, (scene_instance: Phaser.Scene) => {
      if (typeof ref === "function") {
        ref({ game: game.current, scene: scene_instance });
      } else if (ref) {
        ref.current = {
          game: game.current,
          scene: scene_instance,
        };
      }

      if (scene_instance.scene.key === "Game") {
        setIsGameScene(true);
      } else {
        setIsGameScene(false);
      }
    });

    registerEventListeners();

    return () => {
      EventBus.removeListener("current-scene-ready");
      removeAllEventListeners();
    };
  }, [ref, registerEventListeners, removeAllEventListeners]);

  return (
    <div className="w-full h-full">
      <div
        id="game-container"
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        {isGameScene && <InGameUI />}
        {showFriendPanel && <FriendPanel />}
        {showStaffPanel && <Staff />}
        {showManagePanel && <Manage />}
        {showLeaderboardPanel && <LeaderboardPanel />}
        {showInviteInfoPanel && <InviteInfo />}
        {showRollPanel && <Roll />}
        {showQuestPanel && <Task />}
        {showShopPanel && <Shop />}
        {showGuildPanel && <Guild />}
        {showFindGuildPanel && <FindGuild />}
        {showGuildDetailPanel && <GuildDetail />}
        {showRestaurantPanel && <Restaurant />}
        {isShowingLoading && <Loading />}
        {isShowingSnackbar && <SnackBar />}
        {showBoostPanel && <Boost />}
        {showEventPanel && <EventPanel />}
      </div>
    </div>
  );
});
