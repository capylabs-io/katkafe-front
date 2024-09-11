import React, { useState } from "react";
import Image from "next/image";
import Star from "./Star";
import { get } from "lodash";
import { rarityToConfig, Staff } from "@/types/common-types";
import { Item } from "@/types/item";
import { CatRarity } from "@/types/cat-config";
import { CatImage } from "./CatImage";
import classNames from "classnames";
import { MAX_CAT_STAR } from "@/constants/cat";

type Props = {
  cat: Staff | Item;
  isItem?: boolean;
  active?: boolean;
  handleClick?: (staffId: string) => void;
  width?: number;
  height?: number;
  size?: "large" | "medium";
};

const CatCard = ({
  cat,
  active,
  handleClick,
  isItem = false,
  width = 86,
  height = 86,
  size = "medium",
}: Props) => {
  const name = isItem ? get(cat, "configId.name", "") : get(cat, "name", "");
  const _id = isItem ? get(cat, "configId._id", "") : get(cat, "_id", "");

  const numberStar = isItem
    ? get(cat, "configId.numberStar", 0)
    : get(cat, "numberStar", 0);

  const level = get(cat, "level", 0);
  const catRarity = get(cat, "rarity", CatRarity.Common);
  const isSpecial = get(cat, "isSpecial", false);
  const rarity = rarityToConfig(catRarity, isSpecial);
  const backgroundCard = get(rarity, "backgroundCard", "");
  const textColorClasses = get(rarity, "textColorClasses", "");
  const itemImageUrl =
    get(cat, "configId.imgUrl", "") || get(cat, "imgUrl", "");

  return (
    <div
      className="h-full w-full cursor-pointer relative bg-center bg-no-repeat bg-cover"
      onClick={() => {
        handleClick?.(_id);
      }}
      style={{ backgroundImage: backgroundCard }}
    >
      <div className="h-full w-full">
        {active && (
          <div className="active-overlay relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img src="/images/active.png" alt="" className="w-4 h-4" />
            </div>
          </div>
        )}
        <div className="h-full w-full flex flex-col justify-between relative">
          <div className="h-full flex items-center justify-center">
            <div
              className={classNames(
                "flex justify-center relative",
                size === "large" && "pt-6",
                size === "medium" && "pt-5"
              )}
            >
              <div className="absolute bg-[#898989] w-[50%] h-2 rounded-[100%] left-1/2 -translate-x-1/2 bottom-2 z-10"></div>
              {isItem ? (
                <Image
                  src={itemImageUrl}
                  alt="cat pic"
                  width={92.5}
                  height={106}
                  className="relative z-10"
                />
              ) : (
                <CatImage cat={cat} width={width} height={height} />
              )}
            </div>
          </div>
          <div className="absolute w-full h-4 flex items-center justify-center">
            {name && (
              <div
                className={classNames(
                  "text-center",
                  textColorClasses,
                  size === "medium" && "text-[9px] mt-[4%]",
                  size === "large" && "text-xs mt-[9%]"
                )}
              >
                {name}
              </div>
            )}
          </div>
          <div
            className={classNames(
              "flex justify-between items-center ",
              textColorClasses,
              size === "medium" && "!text-[10px] px-2 mb-[4%]",
              size === "large" && "text-xs px-3 mb-[6%]"
            )}
          >
            {level && <div>Lv.{level}</div>}
            <div className="flex items-center">
              {[...Array(numberStar)].map((_, index) => (
                <Star
                  key={index}
                  isHollow={false}
                  customClass={size === "medium" ? "w-3 h-3" : "h-4 w-4"}
                ></Star>
              ))}
              {[...Array(MAX_CAT_STAR - numberStar)].map((_, index) => (
                <Star
                  key={index}
                  isHollow={true}
                  customClass={size === "medium" ? "w-3 h-3" : "h-4 w-4"}
                ></Star>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
