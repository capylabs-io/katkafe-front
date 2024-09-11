import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import StaffCardAssign from "@/components/ui/StaffCardAssign";
import { useStaffStore } from "@/stores/staffStore";
import { assignCat } from "@/requests/restaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { useLoadingStore } from "@/stores/LoadingStore";
import ConfirmDialog from "@/components/ui/common/ConfirmDialog";
import { CAT_SELECT_FILTERS, CAT_STAR_FILTERS } from "@/constants/filter";

type Props = {
  showStaffPanel: React.Dispatch<React.SetStateAction<boolean>>;
  onAssignSuccess: () => void;
};

const StaffAssign: React.FC<Props> = ({ showStaffPanel, onAssignSuccess }) => {
  const options = [
    { value: CAT_SELECT_FILTERS.ALL, label: CAT_SELECT_FILTERS.ALL },
    { value: CAT_SELECT_FILTERS.LEVEL, label: CAT_SELECT_FILTERS.LEVEL },
  ];
  const customClass =
    "border border-[#5d5d5d] w-6 h-6 opacity-50 rounded-md text-[#fc9b53] text-xs flex items-center justify-center";
  const boxShadowStyle = {
    boxShadow: "0px -2px 0px 0px #BC9D9B inset",
  };

  const [isActive, setIsActive] = useState<string[]>([]);
  const [activeStarFilter, setActiveStarFilter] = useState<string>(
    CAT_STAR_FILTERS.ALL
  );
  const [activeSelect, setActiveSelect] = useState<string>(
    CAT_SELECT_FILTERS.ALL
  );
  const [confirmDialog, setConfirmDialog] = useState(false);

  const [autoActives, setAutoActives, staffs, isOneAssign] = useStaffStore(
    (state) => [
      state.autoActives,
      state.setAutoActives,
      state.staffs,
      state.isOneAssign,
    ]
  );
  const [myRestaurants, currentRestaurant, setCurrentRestaurant] =
    useRestaurantStore((state) => [
      state.myRestaurants,
      state.currentRestaurant,
      state.setCurrentRestaurant,
    ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);

  const assignedCatIds = myRestaurants
    .map((restaurant) => restaurant.cats)
    .flat();

  const staffNotAssign = staffs
    .filter((staff) => !assignedCatIds.includes(staff._id))
    .sort((a, b) => b.level - a.level);

  const getFilteredStaffs = () => {
    let filtered = staffNotAssign;

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

  const handleClose = () => {
    showStaffPanel(false);
  };

  const handleStarFilterClick = (filterName: string) => {
    setActiveStarFilter(filterName);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveSelect(event.target.value);
  };

  const handleAssign = async (isActive: string[]) => {
    try {
      if (!currentRestaurant) return;
      if (!isActive) return;
      show();
      const body = {
        locationId: currentRestaurant._id,
        catIds: [...isActive],
      };
      const response = await assignCat(body);
      setCurrentRestaurant(response);
      setConfirmDialog(false);
      onAssignSuccess();
    } catch (error) {
      console.error("Error assign cat", error);
    } finally {
      hide();
    }
    if (isActive !== null) {
      showStaffPanel(false);
    }
  };

  const handleChooseClick = (staffId: string) => {
    if (isActive?.includes(staffId)) {
      setIsActive([]);
    } else {
      setIsActive([staffId]);
    }
  };

  useEffect(() => {
    if (!isOneAssign) {
      if (currentRestaurant) {
        const emptySlot =
          Number(currentRestaurant.slot) - (currentRestaurant.cats.length ?? 0);
        const autoActives = emptySlot - staffNotAssign.length;
        if (autoActives >= 0) {
          setAutoActives(staffNotAssign.length);
        }
        setAutoActives(emptySlot);
      }
      const activeStaffIds = staffNotAssign
        .slice(0, autoActives)
        .map((staff) => staff._id);
      setIsActive(activeStaffIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoActives]);

  return (
    <div className="Game-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4">
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
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>

          <div className="w-full bg-[#fff8de] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-[3px] overflow-hidden mt-8">
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
            <div className="mt-2 gap-2 flex flex-wrap max-h-[350px] overflow-y-auto scroll-style">
              {getFilteredStaffs().map((staff) => (
                <div
                  key={staff._id}
                  className="w-[100px] h-[130px] cursor-pointer"
                >
                  <StaffCardAssign
                    cat={staff}
                    active={isActive?.includes(staff._id)}
                    handleClick={handleChooseClick}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className=" absolute z-40 left-1/2 -translate-x-1/2 bottom-[12px]">
            <hr className="w-[330px] border-[#e8ddbd] mb-2" />
            <div
              className="flex flex-wrap gap-2 justify-center"
              onClick={() => setConfirmDialog(true)}
            >
              <div className="w-[172px] h-[39px] -mb-[3px]">
                <Button>Assign</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {confirmDialog && (
        <ConfirmDialog
          onCancel={() => setConfirmDialog(false)}
          onAgree={() => handleAssign(Array.isArray(isActive) ? isActive : [])}
          title="Assign Confirmation"
          content="Do you want to assign this cat?"
        />
      )}
    </div>
  );
};

export default StaffAssign;
