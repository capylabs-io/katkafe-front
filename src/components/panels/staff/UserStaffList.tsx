import React, { useEffect, useState } from "react";
import CatCard from "../../ui/CatCard";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import CardInfo from "@/components/ui/CardInfo";
import { useStaffStore } from "@/stores/staffStore";
import { Staff } from "@/types/common-types";
import { useLayoutStore } from "@/stores/layoutStore";
import { upgradeRequireStaff, upgradeStaff } from "@/requests/staff";
import { useUserStore } from "@/stores/userStore";
import { Dot, MoveRight } from "lucide-react";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import ConfirmDialog from "@/components/ui/common/ConfirmDialog";
import { assign } from "lodash";
import NumberFormatter from "@/components/ui/NumberFormat";
import { CAT_SELECT_FILTERS, CAT_STAR_FILTERS } from "@/constants/filter";
import usePower, {
  useFetchRestaurants,
} from "@/lib/hooks/restaurant/useRestaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";

const StaffList: React.FC = () => {
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [activeStarFilter, setActiveStarFilter] = useState<string>(
    CAT_STAR_FILTERS.ALL
  );
  const [activeSelect, setActiveSelect] = useState<string>(
    CAT_SELECT_FILTERS.ALL
  );
  const [isActive, setIsActive] = useState<number | null>(null);
  const [numberCatsRequire, setNumberCatsRequire] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const [user, fetchUser] = useUserStore((state) => [
    state.user,
    state.fetchUser,
  ]);

  const [
    fee,
    setFee,
    staffs,
    setStaffs,
    staff,
    setCurrentStaff,
    isChooseUpgrade,
    setIsChooseUpgrade,
    setNumberCatPick,
    speed,
    numberCatRequire,
    numberCatPick,
  ] = useStaffStore((state) => [
    state.fee,
    state.setFee,
    state.staffs,
    state.setStaffs,
    state.currentStaff,
    state.setCurrentStaff,
    state.isChooseUpgrade,
    state.setIsChooseUpgrade,
    state.setNumberCatPick,
    state.speed,
    state.numberCatRequire,
    state.numberCatPick,
  ]);
  const [currentRestaurant] = useRestaurantStore((state) => [
    state.currentRestaurant,
  ]);
  const [setShowStaffPanel] = useLayoutStore((state) => [
    state.setShowStaffPanel,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [showSnackbar] = useSnackBarStore((state) => [state.show]);

  const { fetchStaffs } = useFetchStaffs();
  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchPower } = usePower(currentRestaurant!._id, currentRestaurant!);

  const options = [
    { value: CAT_SELECT_FILTERS.ALL, label: CAT_SELECT_FILTERS.ALL },
    { value: CAT_SELECT_FILTERS.LEVEL, label: CAT_SELECT_FILTERS.LEVEL },
  ];

  const customClass =
    "border border-[#5d5d5d] w-6 h-6 opacity-50 rounded-md text-[#fc9b53] text-xs flex items-center justify-center";
  const boxShadowStyle = { boxShadow: "0px -2px 0px 0px #BC9D9B inset" };

  const staffNotAssign = async (staffs: Staff[]) => {
    return Promise.all(
      staffs.map(async (staff) => {
        const response = await upgradeRequireStaff({
          level: staff.level,
          catId: staff._id,
        });
        const fee = response.nextFee;
        if (!user) return { ...staff, isCanUpgrade: false, fee };
        const isCanUpgrade = staff.level < 100 && fee <= user.bean;
        return { ...staff, isCanUpgrade, fee };
      })
    );
  };

  const fetchStaffData = async () => {
    try {
      show();
      const processedStaffs = await staffNotAssign(staffs);
      setStaffs(processedStaffs);
    } catch (error) {
      console.log("error", error);
    } finally {
      hide();
    }
  };

  const getFilteredStaffs = () => {
    let filtered = staffs;

    // filter by star
    switch (activeStarFilter) {
      case CAT_STAR_FILTERS.ONE_STAR:
        filtered = filtered.filter((staff) => staff.numberStar === 1);
        break;
      case CAT_STAR_FILTERS.TWO_STAR:
        filtered = filtered.filter((staff) => staff.numberStar === 2);
        break;
      case CAT_STAR_FILTERS.THREE_STAR:
        filtered = filtered.filter((staff) => staff.numberStar === 3);
        break;
      default:
        break;
    }

    // filter sort by level
    switch (activeSelect) {
      case CAT_SELECT_FILTERS.LEVEL:
        filtered = filtered.slice().sort((a, b) => b.level - a.level);
        break;
      default:
        break;
    }

    return filtered;
  };

  const handleChooseClick = (staff: Staff) => {
    setCurrentStaff(staff);
    if (Number(staff._id) === isActive) {
      setIsActive(null);
    } else {
      setIsActive(Number(staff._id));
    }
    setShowCardInfo(!showCardInfo);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveSelect(event.target.value);
  };

  const handleStarFilterClick = (filterName: string) => {
    setActiveStarFilter(filterName);
  };

  const handleClose = () => {
    setShowStaffPanel(false);
  };

  const handleCloseDetail = async () => {
    show();
    setNumberCatPick(0);
    setIsActive(0);
    setShowCardInfo(false);
    await fetchDataUpgrade();
    await fetchUser();
    await fetchStaffData();
    hide();
  };

  const fetchDataUpgrade = async () => {
    if (!staff) return;
    const response = await upgradeRequireStaff({
      level: staff.level,
      catId: staff._id,
    });
    setFee(response.fee);
    setNumberCatsRequire(response.numberCatRequire);
  };

  const handleUpgrade = async () => {
    try {
      if (!staff) return;
      if (!user) return;
      if (Number(user.bean) < fee) {
        showSnackbar("Not enough gold!");
        setConfirmDialog(false);
        return;
      }
      if (Number(user.cats.length) < numberCatsRequire) {
        showSnackbar("Not enough cat!");
        setConfirmDialog(false);
        return;
      }
      show();
      const body = { catId: staff._id };
      if (isChooseUpgrade.length > 0) {
        assign(body, { catRequireIds: isChooseUpgrade });
      }
      const data = await upgradeStaff(body);
      setCurrentStaff(data.upgradedCat);
      setNumberCatPick(0);
      // if (isChooseUpgrade.length > 0) {
      //   const body = { catIds: isChooseUpgrade };
      //   await removeStaff(body);
      // }
      await fetchUser();
      await fetchRestaurants();
      await fetchStaffs();
      await fetchPower(currentRestaurant!._id);
      setIsChooseUpgrade([]);
      await fetchDataUpgrade();
      showSnackbar("Upgrade successfully!");
    } catch (error) {
      console.log("error", error);
      showSnackbar("Upgrade failed");
    } finally {
      hide();
      setConfirmDialog(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff?.level]);

  const confirmUpgradeCatDialogContent = (
    <div className="w-full font-normal mt-4">
      <div>Do you want to upgrade this cat?</div>
      <hr className="border-[#B5B5B5] mt-3 mb-2" />
      <div className="text-bodyMd text-left text-black">Earning Speed</div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center">
          <span>
            <img className="w-4 h-4" src="/images/speed.png" alt="" />
          </span>
          <span>{staff?.power} / s</span>
        </div>
        <div>
          <MoveRight size={16} />
        </div>
        <div className="flex gap-1 items-center">
          <span>
            <img className="w-4 h-4" src="/images/speed.png" alt="" />
          </span>
          <span>{speed} / s</span>
        </div>
      </div>

      <div className="text-bodyMd text-left text-black">Upgrade Fee</div>
      <div className="flex items-center gap-1">
        <span>
          <img className="h-4 w-4" src="/images/coin.png" alt="" />
        </span>
        <div> {user && <NumberFormatter value={parseInt(user.bean)} />} /</div>
        <span>
          <img className="h-4 w-4" src="/images/coin.png" alt="" />
        </span>
        <div>{<NumberFormatter value={fee} />} </div>
      </div>
      {numberCatRequire > 0 && (
        <>
          <div className="text-bodyMd text-left text-black">Cat Require</div>
          <div className="flex items-center gap-1">
            {numberCatPick} / {numberCatRequire}
          </div>
        </>
      )}
      <div className="text-bodyMd text-left mt-2">
        <span className="text-black text-bold">Hint: </span>Your Cat will evolve
        at levels 40 and 70
      </div>
    </div>
  );

  return (
    <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
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
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            Staff List
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>

          <div className="w-full bg-[#fff8de] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-1 overflow-hidden mt-8">
            {
              <div className="flex mt-2 items-center justify-between cursor-pointer">
                <select
                  className="z-20 h-7 !border-[#5d5d5d] !border !rounded-md bg-[#FFFDE9] px-1 uppercase"
                  style={boxShadowStyle}
                  onChange={handleSelectChange}
                  value={activeSelect}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1">
                  <span
                    onClick={() => handleStarFilterClick(CAT_STAR_FILTERS.ALL)}
                    className={`${customClass} ${
                      activeStarFilter === CAT_STAR_FILTERS.ALL
                        ? "!opacity-100"
                        : ""
                    }`}
                    style={boxShadowStyle}
                  >
                    {CAT_STAR_FILTERS.ALL}
                  </span>
                  <span
                    onClick={() =>
                      handleStarFilterClick(CAT_STAR_FILTERS.ONE_STAR)
                    }
                    className={`${customClass} ${
                      activeStarFilter === CAT_STAR_FILTERS.ONE_STAR
                        ? "!opacity-100"
                        : ""
                    }`}
                    style={boxShadowStyle}
                  >
                    <img src="/images/OneStar.png" alt="" />
                  </span>
                  <span
                    onClick={() =>
                      handleStarFilterClick(CAT_STAR_FILTERS.TWO_STAR)
                    }
                    className={`${customClass} ${
                      activeStarFilter === CAT_STAR_FILTERS.TWO_STAR
                        ? "!opacity-100"
                        : ""
                    }`}
                    style={boxShadowStyle}
                  >
                    <img src="/images/TwoStar.png" alt="" />
                  </span>
                  <span
                    onClick={() =>
                      handleStarFilterClick(CAT_STAR_FILTERS.THREE_STAR)
                    }
                    className={`${customClass} ${
                      activeStarFilter === CAT_STAR_FILTERS.THREE_STAR
                        ? "!opacity-100"
                        : ""
                    }`}
                    style={boxShadowStyle}
                  >
                    <img src="/images/ThreeStar.png" alt="" />
                  </span>
                </div>
              </div>
            }
            <div className="mt-2 gap-[6px] flex flex-wrap max-h-[405px] overflow-y-auto overflow-x-hidden">
              {getFilteredStaffs().map((staff) => (
                <div
                  key={staff._id}
                  className="w-[100px] h-[130px] cursor-pointer relative"
                  onClick={() => handleChooseClick(staff)}
                >
                  <CatCard cat={staff} />
                  {staff.isCanUpgrade && (
                    <div className="absolute -top-6 -right-6 pointer-events-none">
                      <Dot size={56} color="red" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showCardInfo && (
        <CardInfo
          onBack={handleCloseDetail}
          handleUpgrade={() => setConfirmDialog(true)}
        />
      )}
      {confirmDialog && (
        <ConfirmDialog
          onCancel={() => setConfirmDialog(false)}
          onAgree={handleUpgrade}
          title="Upgrade Confirmation"
          // content="Do you want to upgrade this cat?"
          content={confirmUpgradeCatDialogContent}
        />
      )}
    </div>
  );
};

export default StaffList;
