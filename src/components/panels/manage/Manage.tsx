import React, { useEffect, useState } from "react";
import Button from "../../ui/Button";
import StaffCard from "../../ui/StaffCard";
import StaffAssign from "../staff/UserStaffAssign";
import CardInfo from "@/components/ui/CardInfo";
import { useLayoutStore } from "@/stores/layoutStore";
import { useStaffStore } from "@/stores/staffStore";
import { useFetchRestaurants } from "@/lib/hooks/restaurant/useRestaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import { get } from "lodash";
import { Restaurant as RestaurantType } from "@/types/restaurant";

import {
  removeCat,
  upgradeRestaurant,
  upgradeRequireRestaurant,
} from "@/requests/restaurant";
import { useUserStore } from "@/stores/userStore";
import RemoveConfirmDialog from "@/components/ui/RemoveConfirmDialog";
import { useLoadingStore } from "@/stores/LoadingStore";
import { Loading } from "@/components/ui/Loading";
import NumberFormatter from "@/components/ui/NumberFormat";

const TABS = {
  CAFE: "Cafe",
  STAFF: "Staff",
};

const Manage: React.FC = () => {
  const [setShowManagePanel] = useLayoutStore((state) => [
    state.setShowManagePanel,
  ]);
  const [showStaffPanel, setShowStaffPanel] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.CAFE);
  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs();
  const { fetchUser } = useUserStore();

  const handleClose = () => {
    setShowManagePanel(false);
  };
  const [
    currentRestaurant,
    restaurants,
    power,
    setCurrentRestaurant,
    setRestaurants,
  ] = useRestaurantStore((state) => [
    state.currentRestaurant,
    state.restaurants,
    state.power,
    state.setCurrentRestaurant,
    state.setRestaurants,
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [showAlertRemove, setShowAlertRemove] = useState(false);
  const [showAlertAssign, setShowAlertAssign] = useState(false);
  const [showAlertAvaliable, setShowAlertAvaliable] = useState(false);
  const [showNotiCat, setShowNotiCat] = useState(false);
  const [showNotiBean, setShowNotiBean] = useState(false);
  const [showNotiLevel, setShowNotiLevel] = useState(false);
  const [staffs, setCurrentStaff] = useStaffStore((state) => [
    state.staffs,
    state.setCurrentStaff,
  ]);
  const [fee, setFee] = useState(0);
  const [numberCatsRequire, setNumberCatsRequire] = useState(0);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isOneAssign, setIsOneAssign] = useStaffStore((state) => [
    state.isOneAssign,
    state.setIsOneAssign,
  ]);
  const [isShowing, show, hide] = useLoadingStore((state) => [
    state.isShowing,
    state.show,
    state.hide,
  ]);
  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";

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
      const body = {
        locationId: currentRestaurant._id,
        catId: catIdToRemove,
      };
      const response = await removeCat(body);
      setCurrentRestaurant(response);
      await fetchRestaurants();
      await fetchStaffs();
      setActiveCard(null);
    } catch (error) {
      console.error("Error removing staff", error);
      alert("Failed to delete staff. Please try again.");
    } finally {
      hide();
    }
  };
  const removeAllClick = () => {
    setShowDialog(true);
  };
  const assignSuccess = async () => {
    show();
    await fetchRestaurants();
    await fetchStaffs();
    setActiveCard(null);
    hide();
    if (!isOneAssign) {
      setShowAlertAssign(true);
      setTimeout(() => {
        setShowAlertAssign(false);
      }, 1000);
    }
  };

  const handleRemoveAll = async () => {
    try {
      if (!user || !currentRestaurant || !user.cats) return;
      show();
      const body = {
        locationId: currentRestaurant._id,
        removeAll: true,
      };

      const response = await removeCat(body);
      setRestaurants(response);
      await fetchRestaurants();
      await fetchStaffs();
    } catch (error) {
      console.error("Error remove all", error);
    } finally {
      hide();
      setShowDialog(false);
      setShowAlertRemove(true);
      setTimeout(() => {
        setShowAlertRemove(false);
      }, 1000);
    }
  };
  const autoAssign = async () => {
    if (currentRestaurant === null) return;
    const emptySlot =
      Number(currentRestaurant.slot) - (currentRestaurant.cats.length ?? 0);
    if (emptySlot === 0) {
      setShowAlertAvaliable(true);
      setTimeout(() => {
        setShowAlertAvaliable(false);
      }, 1000);
    } else {
      setIsOneAssign(false);
      setShowStaffPanel(true);
    }
  };

  const handleUpgrade = async () => {
    try {
      if (!user || !currentRestaurant) return;
      if (currentRestaurant.level >= currentRestaurant.maxLevel) {
        setShowNotiLevel(true);
        setTimeout(() => {
          setShowNotiLevel(false);
        }, 1000);
        return;
      }
      if (Number(user.bean) < fee) {
        setShowNotiBean(true);
        setTimeout(() => {
          setShowNotiBean(false);
        }, 1000);
        return;
      }
      if (user.cats.length < numberCatsRequire) {
        setShowNotiCat(true);
        setTimeout(() => {
          setShowNotiCat(false);
        }, 1000);
        return;
      }
      show();
      const data = await upgradeRestaurant({
        locationId: currentRestaurant._id,
      });
      setCurrentRestaurant(data.upgradedLocation);
      // await fetchUser();
      setIsUpdated(true);
    } catch (error) {
      console.error("Error upgrade", error);
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
      setIsUpdated(false);
    } catch (error) {
      console.error("Error upgrade", error);
    } finally {
      hide();
    }
  };
  useEffect(() => {
    if (isUpdated) {
      fetchDataUpgrade();
      fetchRestaurants();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);

  useEffect(() => {
    fetchDataUpgrade();
    fetchRestaurants();
    fetchStaffs();
    if (!currentRestaurant) {
      setCurrentRestaurant(
        restaurants && (restaurants[0] as RestaurantType | null)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                              onRemoveClick={handleRemoveClick}
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
                    <Button onClick={removeAllClick}>Remove All</Button>
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
                        {power} / s
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
                    <div className="w-[172px] h-[39px]" onClick={handleUpgrade}>
                      <Button>Upgrade</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {showStaffPanel && (
          <div className="absolute z-30 w-full h-full top-0 left-0">
            <StaffAssign
              showStaffPanel={setShowStaffPanel}
              onAssignSuccess={assignSuccess}
            />
          </div>
        )}
        {showCardInfo && (
          <div className="absolute z-30 w-full h-full top-0 left-0">
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
      {showAlertRemove && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          Remove Successfully!
        </div>
      )}
      {showAlertAssign && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          Assign Successfully!
        </div>
      )}
      {showAlertAvaliable && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          No slot avaliable!
        </div>
      )}
      {showNotiLevel && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          Max level!
        </div>
      )}
      {showNotiBean && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          Not enough bean!
        </div>
      )}
      {showNotiCat && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          Not eanough cats!
        </div>
      )}
      {isShowing && <Loading />}
    </div>
  );
};

export default Manage;
