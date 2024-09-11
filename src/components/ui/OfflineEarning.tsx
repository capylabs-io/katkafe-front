import React from "react";
import Button from "./Button";
import Image from "next/image";

type Props = {
  onClick: () => void;
  data: string | null;
};

const OfflineEarning = ({ onClick, data }: Props) => {
  return (
    <>
      <div className="bg-[#232322] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"></div>
      <div className="bg-orange-10 absolute rounded-2xl w-[356px] text-center pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 ">
        <div className="p-3">
          <div className="text-xl mb-1">Offline Earning!</div>
          <div className="text-bodyLg text-gray-30 mb-4 max-w-[250px] mx-auto">
            While you&apos;re away, your staffs have work really hard
          </div>

          <div className="flex justify-center mb-3">
            <Image
              src="/images/offline-earning.png"
              alt="cat pic"
              width={150}
              height={150}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="border border-[#DDDCC9] bg-orange-20 px-6 rounded relative">
            <div className="absolute top-1/2 -translate-y-1/2 -left-2">
              <img src="/images/coin.png" className="w-4 h-4" alt="" />
            </div>
            {data ? data : "0"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3 mt-6">
          <div className="w-[164px] h-[39px]" onClick={onClick}>
            <Button>Got it</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfflineEarning;
