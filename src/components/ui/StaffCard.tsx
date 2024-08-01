/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
import Star from "./Star";
import { get } from "lodash";
import { useOneStaff } from "@/lib/hooks/cat/useOneStaff";
import { RARITY } from "@/types/common-types";
import classNames from "classnames";

type Props = {
  catId: string;
  active?: boolean;
  onViewClick: (id: number) => void;
  onRemoveClick: (id: number) => void;
};

const StaffCard = ({ catId, active, onViewClick, onRemoveClick }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const cat = useOneStaff(catId);
  const handleCardClick = () => {
    if (isActive) {
      setIsActive(false);
    }
    setIsActive(!isActive);
  };
  const handleViewClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onViewClick(Number(catId));
  };
  const handleRemoveClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onRemoveClick(Number(cat?._id));
  };
  const customClass = "w-4 h-4";

  const imageUrl = get(cat, "imgUrl", "");
  const name = get(cat, "name", "");
  const numberStar = get(cat, "numberStar", 0);
  const level = get(cat, "level", 0);
  const rarity = get(cat, "rarity", RARITY.COMMON);
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
          <div className="bg-[url('/images/background-cat.png')] bg-center bg-no-repeat bg-contain h-full flex items-end justify-center mt-[18px]">
            <div className="flex justify-center relative">
              <div className="absolute bg-[#898989] w-[50%] h-2 rounded-[100%] left-1/2 -translate-x-1/2 bottom-2 z-30"></div>
              <img
                src={imageUrl}
                alt=""
                className="w-[86px] h-[86px] flex items-center relative z-40"
              />
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
                  numberStar={index + 1}
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
