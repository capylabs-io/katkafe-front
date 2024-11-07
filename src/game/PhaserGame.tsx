import {
  forwardRef,
  SetStateAction,
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
import { Restaurant } from "@/components/panels/restaurant/Restaurant";
import { useLoadingStore } from "@/stores/LoadingStore";
import { Loading } from "@/components/ui/Loading";
import SnackBar from "@/components/ui/common/SnackBar";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import Boost from "@/components/panels/boost/Boost";
import EventPanel from "@/components/panels/event/Event";
import { RedeemPanel } from "@/components/panels/redeem/Redeem";
import { ShopConfirmDialog } from "@/components/ui/shop/ShopConfirmDialog";
import { PurchaseResultDialog } from "@/components/ui/shop/PurchaseResultDialog";
import { MiniGamePanel } from "@/components/panels/mini-game/MiniGamePanel";
import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { MINI_GAME_MODULES } from "@/types/mini-game";
import { RaidingGameUI } from "@/components/ui/RaidingGameUI";
import { ErrorStartApp } from "@/components/ui/ErrorStartApp";
import { WalletPanel } from "@/components/panels/wallet/WalletPanel";
import { TransferPanel } from "@/components/panels/transfer/TransferPanel";
import { useConfirmDialogStore } from "@/stores/confirmDialogStore";
import { ConfirmDialog } from "@/components/ui/CommonConfirmDialog";
import { Announcement } from "@/components/panels/event/Announcement";

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
    showRedeemPanel,
    showMinigamePanel,
    showErrorPanel,
    showWalletPanel,
    showTransferPanel,
    showAnnouncementPanel,
    isAnnouncementPanelOpened,
    setShowAnnouncementPanel,
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
    state.showRedeemPanel,
    state.showMinigamePanel,
    state.showErrorPanel,
    state.showWalletPanel,
    state.showTransferPanel,
    state.showAnnouncementPanel,
    state.isAnnouncementPanelOpened,
    state.setShowAnnouncementPanel,
  ]);

  const [isShowingLoading] = useLoadingStore((state) => [state.isShowing]);
  const [isShowingSnackbar] = useSnackBarStore((state) => [state.isShowing]);
  const [isShowingConfirm] = useConfirmDialogStore((state) => [
    state.isShowing,
  ]);
  const [currentMinigameModule] = useMiniGameStore((state) => [
    state.currentModule,
  ]);

  const isRaiding =
    currentMinigameModule === MINI_GAME_MODULES.RAIDING && showMinigamePanel;

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
    <div
      id="game-container"
      // className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      {isGameScene && !isRaiding && <InGameUI />}
      {isGameScene && isRaiding && <RaidingGameUI />}
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
      {showBoostPanel && <Boost />}
      {showEventPanel && <EventPanel />}
      {showRedeemPanel && <RedeemPanel />}
      {showMinigamePanel && !isRaiding && <MiniGamePanel />}
      {showWalletPanel && <WalletPanel />}
      {showTransferPanel && <TransferPanel />}
      <ShopConfirmDialog />
      <PurchaseResultDialog />
      {isShowingConfirm && <ConfirmDialog />}
      {showErrorPanel && <ErrorStartApp />}
      {isShowingLoading && <Loading />}
      {isShowingSnackbar && <SnackBar />}
    </div>
  );
});
