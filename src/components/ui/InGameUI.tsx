import React, { useCallback, useEffect, useRef, useState } from "react";
import { InfoBox } from "./InfoBox";
import { MenuButton } from "./MenuButton";
import { useLayoutStore } from "@/stores/layoutStore";
import { useUserStore } from "@/stores/userStore";
import { updateLoginStatus, updateStatus } from "@/requests/login";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import AwardPanel from "./AwardPanel";
import { getClaimable } from "@/requests/user";
import OfflineEarning from "./OfflineEarning";
import NumberFormatter, { formatNumber } from "./NumberFormat";
import { useDialogStore } from "@/stores/DialogStore";
import { useGamePlayStore } from "@/stores/GamePlayStore";
import { useGamePlay } from "@/lib/hooks/gameplay/useGamePlay";
import { useStaffStore } from "@/stores/staffStore";
import { Dot } from "lucide-react";
import { useFetchUser } from "@/lib/hooks/useUser";
import Image from "next/image";
import usePower, {
  useFetchRestaurants,
} from "@/lib/hooks/restaurant/useRestaurant";
import { Staff } from "@/types/common-types";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import { useLoadingStore } from "@/stores/LoadingStore";
import Dialog from "./common/Dialog";
import { useUserBoostsStore } from "@/stores/boost/userBoostsStore";
import { BoostType } from "@/types/boost";
import { Animator } from "./Animator";
import { CommonDot } from "./CommonDot";

type Click = {
  id: number;
  name: string;
  x: number;
  y: number;
};
// type CoinRef = {
//   handleClick: () => void;
// }
export const InGameUI = () => {
  let homeUrl = "/icons/ic-home.png";
  let staffUrl = "/icons/ic-staff.png";
  let manageUrl = "/icons/ic-manage.png";
  let shopUrl = "/icons/ic-shop.png";
  let friendUrl = "/icons/ic-friend.png";

  const [clicks, setClicks] = useState<Click[]>([]);
  const [showLoginAward, setShowLoginAward] = useState(false);
  const [initStaff, setInitStaff] = useState<Staff | null>(null);
  const [claimableData, setClaimableData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotiCatUpgrade, setShowNotiCatUpgrade] = useState(false);
  const [showNotiRestaurantUpgrade, setShowNotiRestaurantUpgrade] =
    useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [
    setShowManagePanel,
    setShowStaffPanel,
    setShowShopPanel,
    setShowRestaurantPanel,
    setShowBoostPanel,
    setShowEventPanel,
    setShowRedeemPanel,
  ] = useLayoutStore((state) => [
    state.setShowManagePanel,
    state.setShowStaffPanel,
    state.setShowShopPanel,
    state.setShowRestaurantPanel,
    state.setShowBoostPanel,
    state.setShowEventPanel,
    state.setShowRedeemPanel,
  ]);

  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const [
    currentPower,
    setCurrentPower,
    setMaxPower,
    decreasePower,
    resetTapping,
    increaseCoinTaping,
    increaseTaping,
    setCoinTapping,
  ] = useGamePlayStore((state) => [
    state.currentPower,
    state.setCurrentPower,
    state.setMaxPower,
    state.decreasePower,
    state.resetTapping,
    state.increaseCoinTapping,
    state.increaseTapping,
    state.setCoinTapping,
  ]);
  const [userBoosts] = useUserBoostsStore((state) => [state.userBoosts]);
  let tapTapBoost = userBoosts.find(
    (boost) => boost.boostConfig.type === BoostType.TAP
  );
  let idleBoost = userBoosts.find(
    (boost) => boost.boostConfig.type === BoostType.IDLE
  );

  const [hideDialog, showDialog, setDialogType, DialogType] = useDialogStore(
    (state) => [state.hide, state.show, state.setDialogType, state.type]
  );
  const [restaurantUpgradeConfigs, currentRestaurant, restaurants] =
    useRestaurantStore((state) => [
      state.restaurantUpgradeConfigs,
      state.currentRestaurant,
      state.restaurants,
    ]);
  const [showOfflineEarning, setShowOfflineEarning] = useLayoutStore(
    (state) => [state.showOfflineEarning, state.setShowOfflineEarning]
  );
  const [staffs, staffUpgradeConfigs] = useStaffStore((state) => [
    state.staffs,
    state.staffUpgradeConfigs,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  // const telegramData = useInitData()

  const { power, fetchPower } = usePower(
    currentRestaurant!._id,
    currentRestaurant!
  );
  const { fetchUser } = useFetchUser();
  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs();
  const {
    setStartIntervalRecoverPower,
    setStartIntervalPostTapping,
    setstartIntervalCheckBoost,
    handleClaim,
  } = useGamePlay();

  const checkStaffsUpgrade = () => {
    setShowNotiCatUpgrade(false);
    if (!user) {
      return;
    }
    const isUpgradePossible = staffs.some((staff) =>
      staffUpgradeConfigs.some(
        (config) => staff.level + 1 === config.level && config.fee < user.bean
      )
    );
    if (isUpgradePossible) {
      setShowNotiCatUpgrade(true);
    }
  };

  const checkRestaurantUpgrade = () => {
    setShowNotiRestaurantUpgrade(false);
    if (!user || !currentRestaurant) {
      return;
    }
    const isUpgradePossible = restaurantUpgradeConfigs.some(
      (config) =>
        currentRestaurant.level + 1 === config.level && config.fee < user.bean
    );
    if (isUpgradePossible) {
      setShowNotiRestaurantUpgrade(true);
    }
  };

  const handleOnClick = () => {
    setShowOfflineEarning(false);
    setStartIntervalRecoverPower(true);
    setStartIntervalPostTapping(true);
    setstartIntervalCheckBoost(true);
  };

  const handleClick = async () => {
    if (DialogType === "login") {
      try {
        show();
        const response = await updateLoginStatus();
        if (response) {
          setInitStaff(response);
        }
      } catch (error) {
        console.log("Error updating login status", error);
      } finally {
        hide();
      }
      setShowLoginAward(true);
    }
    hideDialog();
  };
  const handleClaimFirstTimeLogin = async () => {
    try {
      show();
      const response = await updateStatus();
      if (response) {
        setUser(response);
      }
      throw new Error("Error updating status");
    } catch (error) {
      console.log("Create error", error);
    } finally {
      hide();
    }
    setShowLoginAward(false);
    fetchRestaurants(true);
    fetchStaffs();
    setStartIntervalRecoverPower(true);
    setStartIntervalPostTapping(true);
  };

  switch (currentRestaurant?.order) {
    case 2:
      homeUrl = "/icons/ic-home-2.png";
      staffUrl = "/icons/ic-staff-2.png";
      manageUrl = "/icons/ic-manage-2.png";
      shopUrl = "/icons/ic-shop-2.png";
      friendUrl = "/icons/ic-friend-2.png";
      break;
    case 3:
      homeUrl = "/icons/ic-home-3.png";
      staffUrl = "/icons/ic-staff-3.png";
      manageUrl = "/icons/ic-manage-3.png";
      shopUrl = "/icons/ic-shop-3.png";
      friendUrl = "/icons/ic-friend-3.png";
      break;
  }

  const handleTaptapLayoutClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // event.preventDefault()
      // event.stopPropagation()
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newClick: Click = {
          id: clicks.length,
          name: "postion",
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        setClicks([...clicks, newClick]);
        setTimeout(() => {
          setClicks((currentClicks) =>
            currentClicks.filter((click) => click.id !== newClick.id)
          );
        }, 1000);
      }
      // triggerCoinAnimation()
      decreasePower();
      increaseCoinTaping();
      increaseTaping();
    },
    [clicks]
  );

  useEffect(() => {
    resetTapping();
    const handleClaimable = async () => {
      try {
        const response = await getClaimable();
        if (response) {
          setClaimableData(response);
        }
      } catch (error) {
        console.log("Error Claimable", error);
      } finally {
        setLoading(false);
      }
    };
    if (user && !user.isLoginFirstTime && parseInt(user.bean) > 12) {
      handleClaimable();
    }
    if (user) {
      setCurrentPower(user.currentTabs);
      setMaxPower(user.maxTabs);
      setCoinTapping(Number(user.bean));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowOfflineEarning(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  useEffect(() => {
    if (user?.bean) {
      setCoinTapping(Number(user?.bean));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.bean]);

  useEffect(() => {
    handleClaim();
    fetchUser();
    if (user?.isLoginFirstTime) {
      setDialogType("login");
      showDialog({
        title: "Congratulation!",
        content:
          "You received a new comer gift. Open it to get your first staff.",
        buttonText: "Open",
        imgUrl: "/images/login.png",
      });
    }
    useRestaurantStore.setState({ power: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  useEffect(() => {
    checkStaffsUpgrade();
    checkRestaurantUpgrade();
  }, [user]);

  useEffect(() => {
    fetchPower(currentRestaurant!._id);
  }, [restaurants]);

  return (
    <div className="absolute game-ui top-0 bottom-0">
      <div className="absolute flex w-full justify-around py-4 top-4">
        <InfoBox
          key="branch"
          icon={{ url: "/images/coin.png" }}
          content={user ? <NumberFormatter value={Number(user.bean)} /> : "0"}
        />
        {/* <NumberFormatter value={coinTaping!} />  */}
        <InfoBox
          key="branchSPD"
          content={
            user ? <NumberFormatter value={Number(user.diamond)} /> : "0"
          }
          // content={
          //   currentPower ? (
          //     <NumberFormatter
          //       value={
          //         !idleBoost
          //           ? currentPower
          //           : currentPower * idleBoost.boostConfig.boostMultiply
          //       }
          //     />
          //   ) : (
          //     "0"
          //   )
          // }
          icon={{
            url: "/images/kbuck.png",
          }}
        />
        <InfoBox
          key="totalSPD"
          content={
            <div className="relative h-max flex justify-center items-center">
              {power
                ? !idleBoost
                  ? formatNumber(power)
                  : formatNumber(power * idleBoost.boostConfig.boostMultiply)
                : 0}
              <div className="absolute -right-4 top-0">/s</div>
            </div>
          }
          icon={{
            url: "/images/speed.png",
          }}
        />
      </div>
      <div
        ref={containerRef}
        className="absolute w-full h-[52.5%] top-[36%] bg-transparent z-8"
        onClick={(e) => handleTaptapLayoutClick(e)}
      >
        {clicks.map((click) => (
          <>
            <div
              key={`${click.name}-${click.id}-${click.x}`}
              className="clickNumber text-white z-10 flex justify-center gap-x-1 items-center text-3xl"
              style={{ left: click?.x, top: click?.y }}
            >
              <div className="relative text-shadow-black-border">
                +
                {!tapTapBoost
                  ? user!.beansPerTab
                  : user!.beansPerTab * tapTapBoost.boostConfig.boostMultiply}
              </div>
              <Image src="/images/coin.png" width={24} height={24} alt="icon" />
            </div>
            {/* <Coin postionX={click?.x} postionY={click?.y} ref={coinRef} /> */}
          </>
        ))}
      </div>
      <div className="absolute flex w-full justify-between px-8 bottom-8">
        <MenuButton
          key="home"
          title="Home"
          onClick={() => setShowRestaurantPanel(true)}
          icon={{
            url: homeUrl,
          }}
        />
        <div className="relative">
          <MenuButton
            key="list"
            title="List"
            icon={{
              url: staffUrl,
            }}
            onClick={() => setShowStaffPanel(true)}
          />
          {showNotiCatUpgrade && (
            <div className="absolute top-0 right-0 pointer-events-none">
              <CommonDot />
            </div>
          )}
        </div>
        <div className="relative">
          <MenuButton
            key="manage"
            title="Manage"
            icon={{
              url: manageUrl,
            }}
            onClick={() => setShowManagePanel(true)}
          />
          {showNotiRestaurantUpgrade && (
            <div className="absolute top-0 right-0 pointer-events-none">
              <CommonDot />
            </div>
          )}
        </div>
        <MenuButton
          key="shop"
          title="Shop"
          icon={{
            url: shopUrl,
          }}
          onClick={() => setShowShopPanel(true)}
        />
        <MenuButton
          key="friend"
          title="Boost"
          icon={{
            url: friendUrl,
          }}
          onClick={() => setShowBoostPanel(true)}
        />
      </div>
      {/* {user?.isLoginFirstTime && showLoginDialog && (
        <LoginDialog onClick={handleClick} />
      )} */}

      {/* refactor dialog using reusable components, using state management in DialogStore */}
      <Dialog onClick={handleClick} />

      {showLoginAward && (
        <>
          <div className="bg-[#232322] opacity-80 absolute w-full h-full items-center flex justify-center top-0 left-0 z-10"></div>
          <AwardPanel handleClaim={handleClaimFirstTimeLogin} cat={initStaff} />
        </>
      )}
      {!loading && user && !user.isLoginFirstTime && showOfflineEarning && (
        <OfflineEarning onClick={handleOnClick} data={claimableData} />
      )}
      <div className="absolute left-2.5 top-[28%]">
        {/* <MenuButton
          key="shop"
          title="Event"
          icon={{
            url: "/images/task.png",
            size: 56,
          }}
          onClick={() => setShowEventPanel(true)}
          showButtonBg={false}
        /> */}
        <Animator
          width={64}
          height={72}
          url="/images/event-btn.png"
          steps={4}
          onClick={() => setShowEventPanel(true)}
          fps={6}
        />
        <div className="absolute left-1/2 -translate-x-1/2 text-center text-white text-[16px] font-extrabold drop-shadow-[0px_1.5px_black] text-stroke-[0.5px] text-stroke-[#6f6f6f] -bottom-2.5 uppercase">
          Events
        </div>
      </div>
      <div className="absolute right-2.5 top-[28%]">
        {/* <MenuButton
          key="shop"
          title="Event"
          icon={{
            url: "/images/task.png",
            size: 56,
          }}
          onClick={() => setShowEventPanel(true)}
          showButtonBg={false}
        /> */}
        <Animator
          width={64}
          height={72}
          url="/images/redeem-btn.png"
          steps={4}
          onClick={() => setShowRedeemPanel(true)}
          fps={6}
        />
        <div className="absolute left-1/2 -translate-x-1/2 text-center text-white text-[16px] font-extrabold drop-shadow-[0px_1px_black] text-stroke-[0.75px] text-stroke-[#6f6f6f] -bottom-2.5 uppercase">
          Redeem
        </div>
      </div>
    </div>
  );
};
