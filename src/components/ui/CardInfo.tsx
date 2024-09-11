import React, { useEffect, useState } from "react";
import Image from "next/image";
import Star from "./Star";
import Button from "./Button";
import StaffUpgrade from "../panels/staff/UserStaffUpgrade";
import { useStaffStore } from "@/stores/staffStore";
import { upgradeRequireStaff } from "@/requests/staff";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import { useUserStore } from "@/stores/userStore";
import { useLoadingStore } from "@/stores/LoadingStore";
import { Loading } from "./Loading";
import NumberFormatter from "./NumberFormat";
import { MoveRight } from "lucide-react";
import classNames from "classnames";
import StaffCard from "./StaffCard";
import StaffCardAssign from "./StaffCardAssign";
import { CatImage } from "./CatImage";
import { get } from "lodash";
import { CatRarity } from "@/types/cat-config";
import { rarityToConfig } from "@/types/common-types";
import { RarityTag } from "./cat/RarityTag";
import { MAX_CAT_STAR } from "@/constants/cat";

type Props = {
  onBack?: () => void;
  handleUpgrade?: () => void;
};

const CardInfo: React.FC<Props> = ({ onBack, handleUpgrade }: Props) => {
  const [showStaffUpgradePanel, setShowStaffUpgradePanel] = useState(false);
  const [
    staff,
    fee,
    setFee,
    numberCatRequire,
    setNumberCatRequire,
    numberCatPick,
    speed,
    setSpeed,
  ] = useStaffStore((state) => [
    state.currentStaff,
    state.fee,
    state.setFee,
    state.numberCatRequire,
    state.setNumberCatRequire,
    state.numberCatPick,
    state.speed,
    state.setSpeed,
  ]);
  const { fetchStaffs } = useFetchStaffs();
  const [user] = useUserStore((state) => [state.user]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);

  const fetchDataUpgrade = async () => {
    show();
    if (!user || !staff) return;
    try {
      const response = await upgradeRequireStaff({
        level: staff.level,
        catId: staff._id,
      });
      if (response && response.nextFee) {
        setFee(response.nextFee);
        setNumberCatRequire(response.numberCats);
        setSpeed(response.speed);
      }
    } catch (error) {
      console.error("Failed to fetch upgrade data", error);
    } finally {
      setTimeout(() => {
        hide();
      }, 2000);
    }
  };

  const customClass = "w-4 h-4";

  const handleShowStaffUpgrade = () => {
    setShowStaffUpgradePanel(true);
  };

  useEffect(() => {
    fetchDataUpgrade();
    fetchStaffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff, fee]);

  //Card info
  const name = get(staff, "name", "");
  const numberStar = get(staff, "numberStar", 1);
  const level = get(staff, "level", 1);
  const catRarity = get(staff, "rarity", CatRarity.Common);
  const isSpecial = get(staff, "isSpecial", false);
  const rarity = rarityToConfig(catRarity, isSpecial);
  const backgroundCard = get(rarity, "backgroundCard", "");
  const textColorClasses = get(rarity, "textColorClasses", "");

  return (
    <div className="info-panel bg-[#2e2e2e] w-full h-full absolute z-20 p-4 top-0 left-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -top-4 -left-3 cursor-pointer">
            <img
              className="w-8 h-8"
              src="/images/back.png"
              alt=""
              onClick={onBack}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            Staff Info
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-orange-10 h-[calc(100%-32px)] mt-8 relative flex flex-col justify-between items-center p-2 rounded-b-[20px] rounded-t border border-gray-20">
            <div className="w-full flex flex-col items-center overflow-y-auto">
              <div className="h-[208px] w-[160px] mt-4">
                <div
                  className="h-full w-full cursor-pointer bg-center bg-no-repeat bg-contain relative"
                  style={{ backgroundImage: backgroundCard }}
                >
                  <div className="h-full w-full">
                    <div className="h-full w-full flex flex-col justify-between relative">
                      <div className="h-full flex items-center justify-center">
                        <div className="flex justify-center relative">
                          <div className="absolute bg-[#898989] w-[50%] h-2 rounded-[100%] left-1/2 -translate-x-1/2 bottom-2.5 z-30"></div>
                          <CatImage cat={staff} width={128} height={128} />
                        </div>
                      </div>
                      <div className="absolute w-full top-1.5">
                        {name && (
                          <div
                            className={classNames(
                              "text-sm text-center",
                              textColorClasses
                            )}
                          >
                            {name}
                          </div>
                        )}
                      </div>
                      <div
                        className={classNames(
                          "flex justify-between items-center absolute w-full h-6 bottom-2 px-4",
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
                          {[...Array(MAX_CAT_STAR - numberStar)].map(
                            (_, index) => (
                              <Star
                                key={index}
                                isHollow={true}
                                customClass={customClass}
                              ></Star>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center justify-center mx-auto mt-2 px-2 py-1">
                <RarityTag rarity={catRarity} isSpecial={isSpecial} />
              </div>
              <div className="w-full font-normal mt-2 mb-2">
                {/* <hr className="border-[#B5B5B5] mt-3 mb-2" /> */}
                <div className="text-bodyMd text-[#6F6F6F]">Earning Speed</div>
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
                <hr className="border-[#B5B5B5] mt-3 mb-2" />
                <div className="text-bodyMd text-[#6F6F6F]">Upgrade Fee</div>
                <div className="flex items-center gap-1">
                  <span>
                    <img className="h-4 w-4" src="/images/coin.png" alt="" />
                  </span>
                  <div>
                    {" "}
                    {user && <NumberFormatter value={parseInt(user.bean)} />} /
                  </div>
                  <span>
                    <img className="h-4 w-4" src="/images/coin.png" alt="" />
                  </span>
                  <div>{<NumberFormatter value={fee} />} </div>
                </div>
                {numberCatRequire > 0 && (
                  <div className="items-center">
                    <span className="text-bodyMd text-[#6F6F6F]">
                      Cat require
                    </span>
                    <span className="flex items-center gap-1">
                      {numberCatPick} / {numberCatRequire}
                    </span>
                  </div>
                )}
                <div className="text-bodyMd text-left mt-2 text-[#6F6F6F]">
                  <span className="text-black text-bold">Hint: </span>Your Cat
                  will evolve at levels 40 and 70
                </div>
              </div>
            </div>
            <div className="w-full text-center">
              <hr className="mt-4 my-2 border-[#e8ddbd]" />
              <div className="flex gap-2 justify-center">
                {staff && staff.level < 100 && (
                  <>
                    {numberCatRequire === 0 ||
                    numberCatPick > numberCatRequire ? (
                      <div
                        className="w-[172px] h-[39px] hidden"
                        onClick={handleShowStaffUpgrade}
                      >
                        <Button>Pick Cat</Button>
                      </div>
                    ) : (
                      <div
                        className="w-[172px] h-[39px]"
                        onClick={handleShowStaffUpgrade}
                      >
                        <Button>Pick Cat</Button>
                      </div>
                    )}
                  </>
                )}

                {staff && staff.level < 100 ? (
                  <div
                    className={classNames(
                      "w-[172px] h-[39px]",
                      !handleUpgrade && "hidden"
                    )}
                  >
                    {numberCatPick >= numberCatRequire ? (
                      <Button onClick={handleUpgrade}>Upgrade</Button>
                    ) : (
                      <Button disabled>Upgrade</Button>
                    )}
                  </div>
                ) : (
                  <div className="w-[172px] h-[39px]">
                    <Button disabled>Max Level</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showStaffUpgradePanel && (
        <div className="absolute z-50 w-full h-full top-0 left-0">
          <StaffUpgrade showStaffUpgradePanel={setShowStaffUpgradePanel} />
        </div>
      )}
    </div>
  );
};

export default CardInfo;
