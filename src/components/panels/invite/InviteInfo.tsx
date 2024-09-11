import React, { useEffect } from "react";
import { useBonusStore } from "@/stores/friend/bonusStore";
import { useLayoutStore } from "@/stores/layoutStore";
import Button from "@/components/ui/Button";

const InviteInfo: React.FC = () => {
  const [bonuses] = useBonusStore((state) => [
    state.bonuses,
  ]);
  const [setShowInviteInfoPanel] = useLayoutStore((state) => [
    state.setShowInviteInfoPanel,
  ]);

  const handleClose = () => {
    setShowInviteInfoPanel(false);
  };

  return (
    <div className="invite-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -left-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/back.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            Invite info
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-orange-10 rounded-b-[20px] flex flex-col items-center justify-between rounded-t border border-gray-20 w-full overflow-y-auto h-[calc(100%-32px)] p-2 mt-8">
            <div className="w-full">
              <div className="text-center text-xl mb-2">
                Invite friend to get bonus
              </div>
              <div className="flex flex-col justify-between items-center border-orange-20 border rounded-lg p-2 mb-1">
                <div className="flex justify-between items-center w-full mb-1">
                  <div className="flex flex-col gap-1">
                    <div>Invite Regular user</div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4">
                        <img src="/images/kbuck.png" alt="" />
                      </div>
                      <span className="text-[#6F6F6F]">
                        +3 For you and your Friend
                      </span>
                    </div>
                  </div>
                  <div>
                    <img src="/images/info-1.png" alt="" className="w-10" />
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-1">
                    <div>Invite Regular user</div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4">
                        <img src="/images/kbuck.png" alt="" />
                      </div>
                      <span className="text-[#6F6F6F]">
                        +3 For you and your Friend
                      </span>
                    </div>
                  </div>
                  <div>
                    <img src="/images/info-2.png" alt="" className="w-10" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="text-center text-lg mb-4">
                Friend level up bonus
              </div>
              <div className="bg-[#f7f6dc] flex flex-col justify-between items-center border-orange-20 border rounded-lg p-2">
                <div className="justify-between w-full grid grid-cols-10 mb-1">
                  <span className="text-center col-span-4">Level up</span>
                  <span className="text-center col-span-3">Regular</span>
                  <span className="text-center col-span-3">Premium</span>
                </div>
                {bonuses.map((bonus) => (
                  <div key={bonus.id} className="w-full h-full cursor-pointer">
                    {/* <CardBonus bonus={bonus} /> fix error --- to do */}
                  </div>
                ))}
              </div>
              <div className="mt-3 justify-center flex">
                <div className="w-[172px] h-[39px]">
                  <Button>Invite Friend</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteInfo;
