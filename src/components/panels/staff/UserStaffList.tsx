/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import CatCard from "../../ui/CatCard";
import Select from "react-dropdown-select";
import { useStaffs } from "@/lib/hooks/useStaff";
import CardInfo from "@/components/ui/CardInfo";

type Props = {
    showStaffPanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const StaffList: React.FC<Props> = ({ showStaffPanel }) => {
    const [showCardInfo, setShowCardInfo] = useState(false);

    const handleClose = () => {
        showStaffPanel(false);
    };
    const staffs = useStaffs();
    const options = [
        {
            value: 1,
            label: "All",
        },
        {
            value: 2,
            label: "Level",
        },
        {
            value: 3,
            label: "Star",
        },
    ];
    const customClass =
        "border border-[#5d5d5d] w-6 h-6 opacity-50 rounded-md text-[#fc9b53] text-xs flex items-center justify-center";
    const boxShadowStyle = {
        boxShadow: "0px -2px 0px 0px #BC9D9B inset",
    };
    const [activeSelect, setActiveSelect] = useState("All");
    const handleSelectClick = (selectName: string) => {
        setActiveSelect(selectName);
    };
    const [showStaffList, setShowStaffList] = useState(true);
    const [isActive, setIsActive] = useState<number | null>(null);
    const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);

    const handleChooseClick = (staffId: number) => {
        setSelectedStaffId(staffId);

        if (staffId === isActive) {
            setIsActive(null);
        } else {
            setIsActive(staffId);
        }
        setShowStaffList(false);
        setShowCardInfo(!showCardInfo);
    };

    return (
        <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4">
            <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
                <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
                    <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
                        <img
                            className="w-6 h-6"
                            src="/images/btn-close.png"
                            alt=""
                            onClick={handleClose}
                        />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-[#5e5745] bg-[#fffeec] rounded-t-xl text-[#5e5745]">
                        Staff List
                    </div>

                    <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
                        <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
                        <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
                        <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
                    </span>

                    <div className="bg-[#fff8de] rounded-b-[20px] rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-1 overflow-hidden mt-8">
                        {showStaffList && (
                            <div className="flex mt-2 items-center justify-between cursor-pointer">
                                <Select
                                    options={options}
                                    onChange={(values: any) =>
                                        console.log(values)
                                    }
                                    values={[{ value: 1, label: "All" }]}
                                    className="z-20 !w-[86px] h-6 !border-[#5d5d5d] !border !rounded-md"
                                    placeholder=""
                                    style={boxShadowStyle}
                                />
                                <div className="flex items-center gap-1">
                                    <span
                                        onClick={() => handleSelectClick("All")}
                                        className={`${customClass} ${
                                            activeSelect === "All"
                                                ? "!opacity-100"
                                                : ""
                                        }`}
                                        style={boxShadowStyle}
                                    >
                                        All
                                    </span>
                                    <span
                                        onClick={() =>
                                            handleSelectClick("OneStar")
                                        }
                                        className={`${customClass} ${
                                            activeSelect === "OneStar"
                                                ? "!opacity-100"
                                                : ""
                                        }`}
                                        style={boxShadowStyle}
                                    >
                                        <img src="/images/OneStar.png" alt="" />
                                    </span>
                                    <span
                                        onClick={() =>
                                            handleSelectClick("TwoStar")
                                        }
                                        className={`${customClass} ${
                                            activeSelect === "TwoStar"
                                                ? "!opacity-100"
                                                : ""
                                        }`}
                                        style={boxShadowStyle}
                                    >
                                        <img src="/images/TwoStar.png" alt="" />
                                    </span>
                                    <span
                                        onClick={() =>
                                            handleSelectClick("ThreeStar")
                                        }
                                        className={`${customClass} ${
                                            activeSelect === "ThreeStar"
                                                ? "!opacity-100"
                                                : ""
                                        }`}
                                        style={boxShadowStyle}
                                    >
                                        <img
                                            src="/images/ThreeStar.png"
                                            alt=""
                                        />
                                    </span>
                                </div>
                            </div>
                        )}
                        <div
                            className="mt-2 gap-[6px] flex flex-wrap max-h-[440px] overflow-y-auto"
                            style={{
                                scrollbarWidth: "thin",
                                scrollbarColor: "#666666 #ffe",
                            }}
                        >
                            {staffs.map((staff) => (
                                <div
                                    key={staff.id}
                                    className="w-[100px] h-[130px] cursor-pointer"
                                    onClick={() => handleChooseClick(staff.id)}
                                >
                                    <CatCard cat={staff} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {showCardInfo && (
                <CardInfo
                    showCardInfo={setShowCardInfo}
                    staffId={selectedStaffId}
                />
            )}
        </div>
    );
};

export default StaffList;
