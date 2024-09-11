/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Star from "./Star";
import { get } from "lodash";
import { rarityToConfig, Staff } from "@/types/common-types";
import classNames from "classnames";
import { CatRarity } from "@/types/cat-config";
import { useStaffStore } from "@/stores/staffStore";
import { CatImage } from "./CatImage";
import { MAX_CAT_STAR } from "@/constants/cat";

type Props = {
  catId: string;
  active?: boolean;
  onViewClick: () => void;
  onRemoveClick: () => void;
};

const StaffCard = ({ catId, active, onViewClick, onRemoveClick }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const staffs = useStaffStore((state) => state.staffs);
  const handleCardClick = () => {
    if (isActive) {
      setIsActive(false);
    }
    setIsActive(!isActive);
  };
  const handleViewClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onViewClick();
  };
  const handleRemoveClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onRemoveClick();
  };
  const customClass = "w-4 h-4";

  const catData = staffs.find((staff) => staff._id === catId);

  const name = get(catData, "name", "");
  const numberStar = get(catData, "numberStar", 0);
  const level = get(catData, "level", 0);
  const catRarity = get(catData, "rarity", CatRarity.Common);
  const isSpecial = get(catData, "isSpecial", false);
  const rarity = rarityToConfig(catRarity, isSpecial);
  const backgroundCard = get(rarity, "backgroundCard", "");
  const textColorClasses = get(rarity, "textColorClasses", "");

  return (
    <div
      className={classNames(
        `h-full bg-center bg-no-repeat bg-contain w-full cursor-pointer relative`,
        active ? "border-[#FC9B53] rounded-xl border" : ""
      )}
      onClick={handleCardClick}
      style={{ backgroundImage: backgroundCard }}
    >
      <div
        className={`absolute gap-2 flex z-30 -bottom-3 left-1/2 -translate-x-1/2 ${
          !active ? "hidden" : ""
        }`}
      >
        <div onClick={handleRemoveClick} className="w-6 h-6">
          <img src="/images/btn-close.png" alt="close button" />
        </div>
        <div onClick={handleViewClick} className="w-6 h-6">
          <img src="/images/view.png" alt="view button" />
        </div>
      </div>
      <div className="h-full w-full">
        <div className="h-full w-full flex flex-col justify-between relative">
          <div className="h-full flex items-end justify-center mt-[18px]">
            <div className="flex justify-center relative">
              <div className="absolute bg-[#898989] w-[50%] h-2 rounded-[100%] left-1/2 -translate-x-1/2 bottom-[6px] z-30"></div>
              <CatImage cat={catData} width={86} height={86} />
            </div>
          </div>
          <div className="absolute w-full h-4">
            {name && (
              <div
                className={classNames(
                  "text-[8px] mx-1 pt-[8px] text-center h-[30px] relative -my-1",
                  textColorClasses
                )}
              >
                {name}
              </div>
            )}
          </div>
          <div
            className={classNames(
              "flex justify-between items-center px-2 mb-1",
              textColorClasses
            )}
          >
            {level && <div className="text-xs">Lv.{level}</div>}
            <div className="flex items-center">
              {[...Array(numberStar)].map((_, index) => (
                <Star
                  key={index}
                  isHollow={false}
                  customClass={customClass}
                ></Star>
              ))}
              {[...Array(MAX_CAT_STAR - numberStar)].map((_, index) => (
                <Star
                  key={index}
                  isHollow={true}
                  customClass={customClass}
                ></Star>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
