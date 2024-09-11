import Button from "@/components/ui/Button";
import { useFetchRolls } from "@/lib/hooks/roll/useRoll";
import { useLayoutStore } from "@/stores/layoutStore";
import { useRollStore } from "@/stores/roll/rollStore";
import React, { useEffect } from "react";
import Image from "next/image";

function Roll() {
  const [setShowRollPanel] = useLayoutStore((state) => [
    state.setShowRollPanel,
  ]);
  const [rolls] = useRollStore((state) => [state.rolls]);

  const { fetchRolls } = useFetchRolls();

  
  const handleClose = () => {
    setShowRollPanel(false);
  };
  
  useEffect(() => {
    fetchRolls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
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
            Rollin
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-orange-10 rounded-b-[20px] flex flex-wrap gap-x-12 gap-y-8 items-center justify-center rounded-t border border-gray-20 w-full overflow-y-auto h-[calc(100%-32px)] p-4 mt-8">
            {rolls.map((roll) => (
              <div key={roll.id}>
                <div className="flex flex-col items-center gap-2">
                  <div>
                    <Image
                      src={roll.imageUrl}
                      alt=""
                      width={114}
                      height={186}
                    />
                  </div>
                  <div className="w-[76px] h-[28px]">
                    <Button>
                      {roll.price}
                      <Image
                        src="/images/coin.png"
                        alt=""
                        width={12}
                        height={12}
                        className="ml-1"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roll;
