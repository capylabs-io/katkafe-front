import React, { useEffect, useState } from "react";
import { InfoBox } from "./InfoBox";
import { MenuButton } from "./MenuButton";
import { useLayoutStore } from "@/stores/layoutStore";
import { useUserStore } from "@/stores/userStore";
import LoginDialog from "./LoginDialog";
import { createCat, updateLoginStatus, updateStatus } from "@/requests/login";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import LoginAward from "./LoginAward";
import { UserType } from "@/types/user";
import {
  useFetchStaffs,
  useFetchStaffUpgradeConfigs,
} from "@/lib/hooks/cat/useStaff";
import {
  useFetchRestaurantUpgradeConfigs,
  useFetchRestaurants,
} from "@/lib/hooks/restaurant/useRestaurant";
import { getClaim, getClaimable } from "@/requests/user";
import OfflineEarning from "./OfflineEarning";
import NumberFormatter from "./NumberFormat";
import { useInitData } from "@zakarliuka/react-telegram-web-tools";
import { useDialogStore } from "@/stores/DialogStore";
import Dialog from "./Dialog";
import { useStaffStore } from "@/stores/staffStore";
import { Dot } from "lucide-react";

export const InGameUI = () => {
  const [
    setShowFriendPanel,
    setShowManagePanel,
    setShowStaffPanel,
    setShowShopPanel,
    setShowRestaurantPanel,
  ] = useLayoutStore((state) => [
    state.setShowFriendPanel,
    state.setShowManagePanel,
    state.setShowStaffPanel,
    state.setShowShopPanel,
    state.setShowRestaurantPanel,
  ]);
  const [showLoginAward, setShowLoginAward] = useState(false);
  const [response, setResponse] = useState<UserType | null>(null);
  const [user, login, setUser] = useUserStore((state) => [
    state.user,
    state.login,
    state.setUser,
  ]);
  const [power, restaurantUpgradeConfigs, currentRestaurant] =
    useRestaurantStore((state) => [
      state.power,
      state.restaurantUpgradeConfigs,
      state.currentRestaurant,
    ]);
  const [hideDialog, showDialog, setDialogType, setDialogContent, DialogType] =
    useDialogStore((state) => [
      state.hide,
      state.show,
      state.setDialogType,
      state.setDialogContent,
      state.type,
    ]);
  const bean = useUserStore((state) => state.bean);
  const [showOfflineEarning, setShowOfflineEarning] = useLayoutStore(
    (state) => [state.showOfflineEarning, state.setShowOfflineEarning]
  );
  const [claimableData, setClaimableData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [staffs, staffUpgradeConfigs] = useStaffStore((state) => [
    state.staffs,
    state.staffUpgradeConfigs,
  ]);
  const [showNotiCatUpgrade, setShowNotiCatUpgrade] = useState(false);
  const [showNotiRestaurantUpgrade, setShowNotiRestaurantUpgrade] =
    useState(false);
  const telegramData = useInitData();

  const { fetchStaffs } = useFetchStaffs();
  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffUpgradeConfigs } = useFetchStaffUpgradeConfigs();
  const { fetchRestaurantUpgradeConfigs } = useFetchRestaurantUpgradeConfigs();

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

  const numberCats = 8;

  const handleOnClick = () => {
    setShowOfflineEarning(false);
  };

  const handleClick = async () => {
    if (DialogType === "login") {
      try {
        const response = await updateLoginStatus();
        if (response) {
          setUser(response);
          setResponse(response);
        }
      } catch (error) {
        console.log("Error updating login status", error);
      }
      setShowLoginAward(true);
    }
    hideDialog();
  };

  const handleClaim = async () => {
    try {
      const response = await updateStatus();
      if (response) {
        setUser(response);
        setResponse(response);
      }
      for (let i = 0; i < numberCats; i++) {
        await createCat();
      }
      throw new Error("Error updating status");
    } catch (error) {
      console.log("Create error", error);
    }
    setShowLoginAward(false);
  };

  let homeUrl = "/icons/ic-home.png";
  let staffUrl = "/icons/ic-staff.png";
  let manageUrl = "/icons/ic-manage.png";
  let shopUrl = "/icons/ic-shop.png";
  let friendUrl = "/icons/ic-friend.png";
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

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowOfflineEarning(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    const Login = async () => {
      try {
        const loginBody = {
          type: "local",
          initData: telegramData.initData,
          referralCode: telegramData.initDataUnsafe?.start_param,
        };
        await login(loginBody);
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    Login();
    if (user?.isLoginFirstTime) {
      setDialogType("login");
      setDialogContent({
        title: "Congratulation!",
        content:
          "You received a new comer gift. Open it to get your first staff.",
        buttonText: "Open",
        imgUrl: "/images/login.png",
      });
      showDialog();
    }
    useRestaurantStore.setState({ power: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchRestaurants();
      await fetchStaffs();
      await fetchStaffUpgradeConfigs();
      await fetchRestaurantUpgradeConfigs();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkStaffsUpgrade();
    checkRestaurantUpgrade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="absolute game-ui top-0">
      <div className="absolute flex w-full justify-between px-2 py-4">
        <InfoBox
          key="branch"
          title="Balance"
          content={user ? <NumberFormatter value={parseInt(user.bean)} /> : "0"}
        />
        <InfoBox
          key="branchSPD"
          title="Branch SPD"
          content={user?.bean ? power + "/s" : "0/s"}
          icon={{
            url: "/icons/ic-farm.png",
          }}
        />
        <InfoBox
          key="totalSPD"
          title="Total SPD"
          content={power ? power + "/s" : "0/s"}
          icon={{
            url: "/icons/ic-farm.png",
          }}
        />
      </div>

      <div className="absolute flex w-full justify-between bottom-4 px-8">
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
            <div className="absolute -top-6 -right-6 pointer-events-none">
              <Dot size={56} color="red" />
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
            <div className="absolute -top-6 -right-6 pointer-events-none">
              <Dot size={56} color="red" />
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
          title="Friend"
          icon={{
            url: friendUrl,
          }}
          onClick={() => setShowFriendPanel(true)}
        />
      </div>
      {/* {user?.isLoginFirstTime && showLoginDialog && (
        <LoginDialog onClick={handleClick} />
      )} */}

      {/* refactor dialog using reusable components, using state management in DialogStore */}
      <Dialog onClick={handleClick} />

      {showLoginAward && (
        <>
          <div className="bg-[#232322] opacity-80 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-10"></div>
          <LoginAward handleClaim={handleClaim} response={response} />
        </>
      )}
      {!loading && user && !user.isLoginFirstTime && showOfflineEarning && (
        <OfflineEarning onClick={handleOnClick} data={claimableData} />
      )}
    </div>
  );
};
