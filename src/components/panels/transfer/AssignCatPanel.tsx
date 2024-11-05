import StaffCardAssign from "@/components/ui/StaffCardAssign";
import { CAT_SELECT_FILTERS, CAT_STAR_FILTERS } from "@/constants/filter";
import { Staff } from "@/types/common-types";
import React, { useState } from "react";
import Image from "next/image";

type Props = {
  onClose: () => void;
  onAssign: (cat: Staff) => void;
  staffs: Staff[];
};

const options = [
  { value: CAT_SELECT_FILTERS.ALL, label: CAT_SELECT_FILTERS.ALL },
  { value: CAT_SELECT_FILTERS.LEVEL, label: CAT_SELECT_FILTERS.LEVEL },
];
const customClass =
  "border border-[#5d5d5d] w-6 h-6 opacity-50 rounded-md text-[#fc9b53] text-xs flex items-center justify-center";
const boxShadowStyle = {
  boxShadow: "0px -2px 0px 0px #BC9D9B inset",
};

export const AssignCatPanel = ({ onClose, onAssign, staffs }: Props) => {
  const [activeStarFilter, setActiveStarFilter] = useState<string>(
    CAT_STAR_FILTERS.ALL
  );
  const [activeSelect, setActiveSelect] = useState<string>(
    CAT_SELECT_FILTERS.ALL
  );
  const [isActive, setIsActive] = useState<string[]>([]);

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

  const handleStarFilterClick = (filterName: string) => {
    setActiveStarFilter(filterName);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveSelect(event.target.value);
  };

  const handleChooseClick = (staffId: string) => {
    if (isActive?.includes(staffId)) {
      setIsActive([]);
    } else {
      setIsActive([staffId]);
    }
  };

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="absolute top-6 left-4 bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
        <Image
          src="/images/back.png"
          alt="cat pic"
          width={32}
          height={32}
          onClick={onClose}
        />
      </div>
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px-64px)] mt-16">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            <div className="uppercase font-semibold">Staff List</div>
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
        </div>
      </div>
    </div>
  );
};
