import React from "react";
import Button from "../../ui/Button";
import Image from "next/image";
import { useLayoutStore } from "@/stores/layoutStore";
import { useGuildStore } from "@/stores/guildStore";
import CardFriend from "@/components/ui/CardFriend";
import { LogOut } from "lucide-react";

function GuildDetail() {
  const [setShowGuildDetailPanel, setShowGuildPanel, setShowFindGuildPanel] =
    useLayoutStore((state) => [
      state.setShowGuildDetailPanel,
      state.setShowGuildPanel,
      state.setShowFindGuildPanel,
    ]);
  const currentGuild = useGuildStore((state) => state.currentGuild);
  const handleClose = () => {
    setShowGuildDetailPanel(false);
    setShowGuildPanel(false);
    setShowFindGuildPanel(false);
  };

  const handleBack = () => {
    setShowGuildDetailPanel(false);
  };
  console.log("totalMember", currentGuild?.totalMember);

  const handleClick = () => {
    console.log("mmmmmmmm");
  };

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
          <div className="absolute -top-4 -left-3 bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <Image
              src="/images/back.png"
              alt="cat pic"
              width={32}
              height={32}
              onClick={handleBack}
            />
          </div>
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <Image
              src="/images/btn-close.png"
              alt="cat pic"
              width={24}
              height={24}
              onClick={handleClose}
            />
          </div>
          <div className="flex">
            <div className="absolute cursor-pointer left-1/2 -translate-x-1/2 border-2 px-6 py-1 border-[#5e5745] bg-[#fffeec] -translate-y-[20px] rounded-t-xl text-[#5e5745]">
              Guild Detail
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-[#fff8de] w-full rounded-b-[20px] flex flex-col justify-between rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-4 overflow-hidden mt-8">
            <div className="flex justify-center">
              <Image
                src={currentGuild?.backgroundUrl || "/images/bg-deploy.png"}
                alt="cat pic"
                width={150}
                height={200}
              />
            </div>
            <div className="flex gap1 items-center justify-center mb-2">
              <div>
                <Image
                  src={currentGuild?.imageUrl || "/images/bg-deploy.png"}
                  alt="cat pic"
                  width={28}
                  height={28}
                />
              </div>
              <div className="text-xl">{currentGuild?.title}</div>
            </div>
            <div className="flex items-center gap-8 mb-4">
              <div>
                <div>Total Minted</div>
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/coin.png"
                    alt="cat pic"
                    width={16}
                    height={16}
                  />
                  <div>{currentGuild?.totalMinted}M</div>
                </div>
              </div>
              <div>
                <div>Total Member</div>
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/coin.png"
                    alt="cat pic"
                    width={16}
                    height={16}
                  />
                  <div>{currentGuild?.totalMember}M</div>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto">
              {[...Array(Number(currentGuild?.totalMember))].map((_, index) =>
                currentGuild?.member[index] ? (
                  <div key={index} className="mb-1">
                    <CardFriend friend={currentGuild?.member[index]} />
                  </div>
                ) : null
              )}
            </div>
            <div className="flex justify-center pt-2">
              <div className="w-[156px] h-[39px]" onClick={handleClick}>
                <Button>Join Guild</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuildDetail;