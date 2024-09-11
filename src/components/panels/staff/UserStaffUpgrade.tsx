import React, { useEffect, useMemo, useState } from "react";
import CatCard from "../../ui/CatCard";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import Button from "@/components/ui/Button";
import { useStaffStore } from "@/stores/staffStore";
import { Staff } from "@/types/common-types";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";

type Props = {
  showStaffUpgradePanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const StaffUpgrade: React.FC<Props> = ({ showStaffUpgradePanel }) => {
  const customClass =
    "border border-[#5d5d5d] w-6 h-6 opacity-50 rounded-md text-[#fc9b53] text-xs flex items-center justify-center";
  const boxShadowStyle = {
    boxShadow: "0px -2px 0px 0px #BC9D9B inset",
  };
  const options = [
    {
      value: 1,
      label: "All",
    },
    {
      value: 2,
      label: "Level",
    },
    // {
    //   value: 3,
    //   label: "Star",
    // },
  ];
  const [activeSelect, setActiveSelect] = useState("All");
  const [activeStarFilter, setActiveStarFilter] = useState<string>("All");
  const [selectedCards, setSelectedCards] = useState<Staff[]>([]);
  const [isActive, setIsActive] = useState<string[]>([]);

  const [
    staffs,
    currentStaff,
    isChooseUpgrade,
    setIsChooseUpgrade,
    setNumberCatPick,
    numberCatRequire,
  ] = useStaffStore((state) => [
    state.staffs,
    state.currentStaff,
    state.isChooseUpgrade,
    state.setIsChooseUpgrade,
    state.setNumberCatPick,
    state.numberCatRequire,
  ]);
  const [myRestaurants] = useRestaurantStore((state) => [state.myRestaurants]);

  const { fetchStaffs } = useFetchStaffs();

  const handleBack = () => {
    showStaffUpgradePanel(false);
  };
  const handleSelectClick = (selectName: string) => {
    setActiveSelect(selectName);
    setActiveStarFilter(selectName);
  };

  //  @TODO:: staff in all restaurants
  // const staffNotAssign = staffs.filter((staff) => {
  //   return (
  //     currentStaff &&
  //     staff._id !== currentStaff._id &&
  //     !currentRestaurant?.cats.some((cat) => cat === staff._id)
  //   );
  // });
  const assignedCatIds = myRestaurants
    .map((restaurant) => restaurant.cats)
    .flat();

  const staffNotAssign = staffs
    .filter((staff) => !assignedCatIds.includes(staff._id))
    .sort((a, b) => b.level - a.level);

  const getFilteredStaffs = () => {
    let filtered = staffNotAssign;

    if (activeStarFilter !== "All") {
      filtered = filtered.filter((staff) => {
        if (activeStarFilter === "OneStar") return staff.numberStar === 1;
        if (activeStarFilter === "TwoStar") return staff.numberStar === 2;
        if (activeStarFilter === "ThreeStar") return staff.numberStar === 3;
        return true;
      });
    }
    if (activeSelect === "2") {
      filtered = filtered.slice().sort((a, b) => b.level - a.level);
    }
    return filtered;
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveSelect(event.target.value);
  };

  const autoActiveIsChooseUpgrade = () => {
    setIsActive(isChooseUpgrade.slice(0, isChooseUpgrade.length));
  };

  const handleChooseClick = (staffId: string) => {
    const selectedStaff = staffs.find((staff) => staff._id === staffId);
    if (!selectedStaff) return;

    if (isActive.includes(staffId)) {
      setSelectedCards(selectedCards.filter((item) => item._id !== staffId));
      setIsActive(isActive.filter((id) => id !== staffId));
      setIsChooseUpgrade(isChooseUpgrade.filter((id) => id !== staffId));
    } else {
      if (isActive.length >= numberCatRequire) return;

      setSelectedCards([...selectedCards, selectedStaff]);
      setIsActive([...isActive, staffId]);
      setIsChooseUpgrade([...isChooseUpgrade, staffId]);
    }
  };

  const handleClickAssign = () => {
    showStaffUpgradePanel(false);
    setNumberCatPick(isActive.length);
    setIsActive([]);
  };
  useEffect(() => {
    fetchStaffs();
    autoActiveIsChooseUpgrade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChooseUpgrade]);

  return (
    <div className="grade-panel bg-[#2e2e2e] w-full h-full absolute z-50 p-4">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -top-4 -left-3 bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-8 h-8"
              src="/images/back.png"
              alt=""
              onClick={handleBack}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            Staff Upgrade
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>

          <div className="w-full bg-[#fff8de] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-1 overflow-hidden mt-8">
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
                  onClick={() => handleSelectClick("All")}
                  className={`${customClass} ${
                    activeSelect === "All" ? "!opacity-100" : ""
                  }`}
                  style={boxShadowStyle}
                >
                  All
                </span>
                <span
                  onClick={() => handleSelectClick("OneStar")}
                  className={`${customClass} ${
                    activeSelect === "OneStar" ? "!opacity-100" : ""
                  }`}
                  style={boxShadowStyle}
                >
                  <img src="/images/OneStar.png" alt="" />
                </span>
                <span
                  onClick={() => handleSelectClick("TwoStar")}
                  className={`${customClass} ${
                    activeSelect === "TwoStar" ? "!opacity-100" : ""
                  }`}
                  style={boxShadowStyle}
                >
                  <img src="/images/TwoStar.png" alt="" />
                </span>
                <span
                  onClick={() => handleSelectClick("ThreeStar")}
                  className={`${customClass} ${
                    activeSelect === "ThreeStar" ? "!opacity-100" : ""
                  }`}
                  style={boxShadowStyle}
                >
                  <img src="/images/ThreeStar.png" alt="" />
                </span>
              </div>
            </div>
            <div className="mt-2 gap-[6px] flex flex-wrap max-h-[350px] overflow-y-auto">
              {getFilteredStaffs().map((staff) => (
                <div
                  key={staff._id}
                  className="w-[100px] h-[130px] cursor-pointer"
                >
                  <CatCard
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
              onClick={handleClickAssign}
            >
              <div className="w-[172px] h-[39px] -mb-[3px]">
                <Button>
                  Confirm {isActive.length} / {numberCatRequire}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffUpgrade;
