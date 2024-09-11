import React, { useEffect, useState } from "react";
import Button from "../../ui/Button";
import StaffCard from "../../ui/StaffCard";
import StaffAssign from "../staff/UserStaffAssign";
import CardInfo from "@/components/ui/CardInfo";
import { useLayoutStore } from "@/stores/layoutStore";
import { useStaffStore } from "@/stores/staffStore";
import usePower, {
  useFetchRestaurants,
} from "@/lib/hooks/restaurant/useRestaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import { get } from "lodash";

import {
  removeCat,
  upgradeRestaurant,
  upgradeRequireRestaurant,
} from "@/requests/restaurant";
import { useUserStore } from "@/stores/userStore";
import RemoveConfirmDialog from "@/components/ui/RemoveConfirmDialog";
import { useLoadingStore } from "@/stores/LoadingStore";
import NumberFormatter, { formatNumber } from "@/components/ui/NumberFormat";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import ConfirmDialog from "@/components/ui/common/ConfirmDialog";
import { useUserBoostsStore } from "@/stores/boost/userBoostsStore";
import { BoostType } from "@/types/boost";
import { MoveRight } from "lucide-react";

const TABS = {
  CAFE: "Cafe",
  STAFF: "Staff",
};
const CONFIRM_DIALOG_TYPE = {
  REMOVE: "remove",
  UPGRADE: "upgrade",
};

const Manage: React.FC = () => {
  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";
  const [showStaffPanel, setShowStaffPanel] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.CAFE);
  const [showDialog, setShowDialog] = useState(false);
  const [fee, setFee] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [confirmDialogType, setConfirmDialogType] = useState("");
  const [numberCatsRequire, setNumberCatsRequire] = useState(0);
  const [currentRestaurant, setCurrentRestaurant, setRestaurants] =
    useRestaurantStore((state) => [
      state.currentRestaurant,
      state.setCurrentRestaurant,
      state.setRestaurants,
    ]);
  const [setShowManagePanel] = useLayoutStore((state) => [
    state.setShowManagePanel,
  ]);
  const [staffs, setCurrentStaff] = useStaffStore((state) => [
    state.staffs,
    state.setCurrentStaff,
  ]);
  const [user] = useUserStore((state) => [state.user]);
  const [isOneAssign, setIsOneAssign] = useStaffStore((state) => [
    state.isOneAssign,
    state.setIsOneAssign,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [showSnackbar] = useSnackBarStore((state) => [state.show]);

  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs();
  const { power } = usePower(currentRestaurant!._id, currentRestaurant!);
  const [userBoosts] = useUserBoostsStore((state) => [state.userBoosts]);
  let idleBoost = userBoosts.find(
    (boost) => boost.boostConfig.type === BoostType.IDLE
  );

  const handleClose = () => {
    setShowManagePanel(false);
  };

  const fetchDataUpgrade = async () => {
    if (currentRestaurant?.level === currentRestaurant?.maxLevel) return;
    try {
      if (!user || !currentRestaurant) return;
      show();
      const body = {
        currentLocationLevel: currentRestaurant.level,
        currentLocationOrder: currentRestaurant.order,
      };
      const response = await upgradeRequireRestaurant(body);
      setFee(response.fee);
      setNumberCatsRequire(response.numberCats);
    } catch (error) {
      console.error("Error upgrade", error);
    } finally {
      hide();
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleStaffPanel = () => {
    setIsOneAssign(true);
    setShowStaffPanel(!showStaffPanel);
  };

  const handleCardClick = (index: number) => {
    setActiveCard(index === activeCard ? null : index);
  };

  const handleViewClick = (catId: string) => {
    const staff = staffs.find((staff) => get(staff, "_id") === catId);
    if (staff) {
      setCurrentStaff(staff);
    }
    setShowCardInfo(!showCardInfo);
    setActiveCard(null);
  };

  const handleRemoveClick = async () => {
    try {
      if (
        !user ||
        !currentRestaurant ||
        user.cats.length === 0 ||
        activeCard === null
      )
        return;
      const catIdToRemove = currentRestaurant.cats[activeCard];
      setConfirmDialog(false);
      show();
      const body = {
        locationId: currentRestaurant._id,
        catId: catIdToRemove,
      };
      const response = await removeCat(body);
      setCurrentRestaurant(response);
      showSnackbar("Remove successfully!");
      setActiveCard(null);
      await fetchRestaurants();
      await fetchStaffs();
    } catch (error) {
      console.error("Error removing staff", error);
      // alert("Failed to delete staff. Please try again.");
      showSnackbar("Failed to remove staff. Please try again.");
    } finally {
      hide();
    }
  };

  const assignSuccess = async () => {
    show();
    await fetchRestaurants();
    await fetchStaffs();
    setActiveCard(null);
    hide();
    if (!isOneAssign) {
      showSnackbar("Assign successfully!");
    }
  };

  const handleRemoveAll = async () => {
    try {
      if (!user || !currentRestaurant || !user.cats) return;
      setShowDialog(false);
      show();
      const body = {
        locationId: currentRestaurant._id,
        removeAll: true,
      };

      const response = await removeCat(body);
      setCurrentRestaurant(response);
      await fetchRestaurants();
      await fetchStaffs();
    } catch (error) {
      console.error("Error remove all", error);
      showSnackbar("Remove all Fail!");
    } finally {
      hide();
      setShowDialog(false);
      showSnackbar("Remove all successfully!");
    }
  };

  const autoAssign = async () => {
    if (currentRestaurant === null) return;
    const emptySlot =
      Number(currentRestaurant.slot) - (currentRestaurant.cats.length ?? 0);
    if (emptySlot === 0) {
      showSnackbar("No slot avaliable!");
    } else {
      setIsOneAssign(false);
      setShowStaffPanel(true);
    }
  };

  const handleUpgrade = async () => {
    try {
      if (!user || !currentRestaurant) return;
      if (currentRestaurant.level >= currentRestaurant.maxLevel) {
        showSnackbar("Max level!");
        return;
      }
      if (Number(user.bean) < fee) {
        showSnackbar("Not enough gold!");
        return;
      }
      if (user.cats.length < numberCatsRequire) {
        showSnackbar("Not eanough cats!");
        return;
      }
      setConfirmDialog(false);
      show();
      const data = await upgradeRestaurant({
        locationId: currentRestaurant._id,
      });
      setCurrentRestaurant(data.upgradedLocation);
      fetchRestaurants();
      fetchDataUpgrade();
      showSnackbar("Upgrade Successfully!");
    } catch (error) {
      console.error("Error upgrade", error);
      showSnackbar("Upgrade Fail!");
    } finally {
      if (
        currentRestaurant &&
        currentRestaurant.level < currentRestaurant.maxLevel
      )
        setTimeout(() => {
          hide();
        }, 1000);
    }
  };

  const handleShowConfirmDialog = (confirmDialogType: any) => {
    switch (confirmDialogType) {
      case CONFIRM_DIALOG_TYPE.REMOVE:
        setConfirmDialogType(CONFIRM_DIALOG_TYPE.REMOVE);
        break;
      case CONFIRM_DIALOG_TYPE.UPGRADE:
        setConfirmDialogType(CONFIRM_DIALOG_TYPE.UPGRADE);
        break;
      default:
        break;
    }
    setConfirmDialog(true);
  };

  const handleAgreeConfirmDialog = () => {
    switch (confirmDialogType) {
      case CONFIRM_DIALOG_TYPE.REMOVE:
        handleRemoveClick();
        break;
      case CONFIRM_DIALOG_TYPE.UPGRADE:
        handleUpgrade();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    fetchDataUpgrade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upgradeLocationContent = (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <div>Do you want to upgrade this restaurant</div>
        <hr className="border-[#B5B5B5] mt-3 mb-2" />
        <span className="text-bodyMd text-black text-left">Upgrade Fee</span>
        <div className="flex items-center">
          <span className="flex items-center gap-1">
            <img className="w-4 h-4" src="/images/coin.png" alt="" />
            {user && <NumberFormatter value={parseInt(user.bean)} />} /
          </span>
          <span className="flex items-center gap-1 ml-1">
            <img className="w-4 h-4" src="/images/coin.png" alt="" />
            <NumberFormatter value={fee} />
          </span>
        </div>
        <span className="text-bodyMd text-black text-left">Cat in Cafe</span>
        <div className="flex items-center gap-1">
          <span className="flex items-center gap-x-2">
            <img
              src="/images/slot_cat.png"
              className="w-[18px] h-[18px]"
              alt=""
            />
            {currentRestaurant?.slot}
          </span>

          <MoveRight size={16} />
          <span className="flex items-center gap-x-2">
            <img
              src="/images/slot_cat.png"
              className="w-[18px] h-[18px]"
              alt=""
            />
            {currentRestaurant?.slot + 1}
          </span>
        </div>
      </div>
      {numberCatsRequire > 0 &&
        currentRestaurant &&
        currentRestaurant.level < currentRestaurant.maxLevel && (
          <div className="flex flex-col items-end">
            <span className="text-bodyMd text-black text-left">
              Number cat require
            </span>
            <div className="flex items-center gap-1">
              <span>
                <img
                  className="w-[18px] h-[18px]"
                  src="/images/slot_cat.png"
                  alt=""
                />
              </span>
              <span className="flex items-center gap-1">
                {user && user.cats.length}/
              </span>
              <span className="flex items-center gap-1">
                {numberCatsRequire}
              </span>
            </div>
          </div>
        )}
    </div>
  );

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="flex">
            <div
              onClick={() => handleTabClick(TABS.CAFE)}
              className={`absolute cursor-pointer left-1/2 -translate-x-[100px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === TABS.CAFE ? isActive : ""
              }`}
            >
              Cafe
            </div>
            <div
              onClick={() => handleTabClick(TABS.STAFF)}
              className={`absolute cursor-pointer left-1/2 translate-x-[10px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === TABS.STAFF ? isActive : ""
              }`}
            >
              Staff
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          {activeTab === TABS.STAFF && (
            <div className="bg-[#fffeec] rounded-b-[20px] flex flex-col justify-between rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8">
              <div className="flex items-center bg-orange-20 border border-[#dddcc9] w-fit px-4 rounded relative mx-auto my-2">
                {power} / s
                <span className="absolute top-1/2 -translate-y-1/2 -left-[10px]">
                  <img src="./images/speed.png" alt="" className="w-6 h-6" />
                </span>
              </div>
              <div className="h-[calc(100%-26px-8px)] overflow-y-auto">
                <>
                  <div
                    key={currentRestaurant?._id}
                    className="grid grid-cols-3 gap-y-4 mt-2"
                  >
                    {Array.from(Array(currentRestaurant?.slot)).map(
                      (_, index) =>
                        !currentRestaurant?.cats[index] ? (
                          <>
                            <div className="relative h-fit">
                              <img
                                key={index}
                                src="/images/empty-cat.png"
                                alt="Empty Cat"
                                className="w-[100px] h-[130px]"
                              />
                              <img
                                src="/images/plus.png"
                                alt=""
                                className="absolute left-1/2 -translate-x-1/2 bottom-3 cursor-pointer"
                                onClick={toggleStaffPanel}
                              />
                            </div>
                          </>
                        ) : (
                          <div
                            key={index}
                            className="w-[100px] h-[130px]"
                            onClick={() => handleCardClick(index)}
                          >
                            <StaffCard
                              onRemoveClick={() =>
                                handleShowConfirmDialog(
                                  CONFIRM_DIALOG_TYPE.REMOVE
                                )
                              }
                              onViewClick={() =>
                                handleViewClick(currentRestaurant.cats[index])
                              }
                              catId={currentRestaurant.cats[index]}
                              active={index === activeCard}
                            />
                          </div>
                        )
                    )}
                  </div>
                </>
              </div>
              <div>
                <hr className="mt-4 my-2 border-[#e8ddbd]" />
                <div className="flex gap-2 justify-center">
                  <div className="w-[156px] h-[39px]">
                    <Button onClick={() => setShowDialog(true)}>
                      Remove All
                    </Button>
                  </div>
                  <div className="w-[156px] h-[39px]">
                    <Button onClick={autoAssign}>Auto Assign</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === TABS.CAFE && (
            <div className="bg-[#fff8de] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8 w-full flex flex-col justify-between">
              <div className="gap-6 overflow-y-auto px-1">
                <div>
                  <img
                    src={currentRestaurant?.imgUrl}
                    className="w-[312px] h-[200px] !rounded"
                    alt=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-bodyXl mt-2">
                    {currentRestaurant?.name}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-bodyMd text-[#6f6f6f]">
                        Earning Speed
                      </span>
                      <span className="flex items-center gap-1">
                        <img
                          className="w-4 h-4"
                          src="/images/speed.png"
                          alt=""
                        />
                        {!idleBoost && `${formatNumber(Number(power))} /s`}
                        {idleBoost &&
                          `${formatNumber(Number(power))} + ${formatNumber(
                            Number(power) *
                              idleBoost.boostConfig.boostMultiply -
                              Number(power)
                          )} /s`}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-bodyMd text-[#6f6f6f]">
                        Cat in Cafe
                      </span>
                      <div className="flex items-center gap-1">
                        <img
                          src="/images/slot_cat.png"
                          className="w-[18px] h-[18px]"
                          alt=""
                        />
                        <span>
                          {currentRestaurant?.cats.length} /{" "}
                          {currentRestaurant?.slot}
                        </span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-t border-gray-20 my-2" />
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-bodyMd text-[#6f6f6f]">
                        Upgrade Fee
                      </span>
                      <div className="flex items-center">
                        <span className="flex items-center gap-1">
                          <img
                            className="w-4 h-4"
                            src="/images/coin.png"
                            alt=""
                          />
                          {user && (
                            <NumberFormatter value={parseInt(user.bean)} />
                          )}{" "}
                          /
                        </span>
                        <span className="flex items-center gap-1 ml-1">
                          <img
                            className="w-4 h-4"
                            src="/images/coin.png"
                            alt=""
                          />
                          <NumberFormatter value={fee} />
                        </span>
                      </div>
                    </div>
                    {numberCatsRequire > 0 &&
                      currentRestaurant &&
                      currentRestaurant.level < currentRestaurant.maxLevel && (
                        <div className="flex flex-col items-end">
                          <span className="text-bodyMd text-[#6f6f6f]">
                            Number cat require
                          </span>
                          <div className="flex items-center gap-1">
                            <span>
                              <img
                                className="w-[18px] h-[18px]"
                                src="/images/slot_cat.png"
                                alt=""
                              />
                            </span>
                            <span className="flex items-center gap-1">
                              {user && user.cats.length}/
                            </span>
                            <span className="flex items-center gap-1">
                              {numberCatsRequire}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div>
                <hr className="mt-4 my-2 border-[#e8ddbd]" />
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentRestaurant &&
                  currentRestaurant.level === currentRestaurant.maxLevel ? (
                    <div className="w-[172px] h-[39px]">
                      <Button disabled>Max Level</Button>
                    </div>
                  ) : (
                    <div
                      className="w-[172px] h-[39px]"
                      onClick={() => {
                        handleShowConfirmDialog(CONFIRM_DIALOG_TYPE.UPGRADE);
                      }}
                    >
                      <Button>Upgrade</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {showStaffPanel && (
          <div className="absolute !z-20 w-full h-full top-0 left-0">
            <StaffAssign
              showStaffPanel={setShowStaffPanel}
              onAssignSuccess={assignSuccess}
            />
          </div>
        )}
        {showCardInfo && (
          <div className="absolute !z-20 w-full h-full top-0 left-0">
            <CardInfo onBack={() => setShowCardInfo(false)} />
          </div>
        )}
      </div>
      {showDialog && (
        <>
          <div className="bg-[#807f76] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-10"></div>
          <RemoveConfirmDialog
            handleClick={handleRemoveAll}
            onClose={() => setShowDialog(false)}
          />
        </>
      )}
      {confirmDialog && (
        <ConfirmDialog
          onCancel={() => setConfirmDialog(false)}
          onAgree={handleAgreeConfirmDialog}
          title={
            confirmDialogType === CONFIRM_DIALOG_TYPE.UPGRADE
              ? "Upgrade Confirmation"
              : "Remove Confirmation"
          }
          content={
            confirmDialogType === CONFIRM_DIALOG_TYPE.UPGRADE
              ? upgradeLocationContent
              : "Do you want to remove this cat?"
          }
        ></ConfirmDialog>
      )}
    </div>
  );
};

export default Manage;
