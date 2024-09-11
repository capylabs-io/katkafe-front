import Button from "@/components/ui/Button";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect } from "react";
import Image from "next/image";
import { useUserStore } from "@/stores/userStore";
import { LogOut } from "lucide-react";
import { useGuildStore } from "@/stores/guild/guildStore";
import CardFriend from "@/components/ui/CardFriend";

type Props = {};

function Guild({}: Props) {
  const [setShowGuildPanel, setShowFindGuildPanel] = useLayoutStore((state) => [
    state.setShowGuildPanel,
    state.setShowFindGuildPanel,
  ]);
  const user = useUserStore((state) => state.user);
  const [guild, guilds, setCurrentGuild] = useGuildStore((state) => [
    state.guild,
    state.guilds,
    state.setCurrentGuild,
  ]);


  const handleClose = () => {
    setShowGuildPanel(false);
  };

  const handleFindGuildClick = () => {
    setShowFindGuildPanel(true);
  };
  const userGuildId = user?.guildId;
  const isGuildIdInList = guilds.some((guild) => guild.id === userGuildId);

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <Image
              src="/images/btn-close.png"
              alt="cat pic"
              width={24}
              height={24}
              onClick={handleClose}
            />
          </div>
          {!isGuildIdInList ? (
            <>
              <div className="flex">
                <div className="absolute cursor-pointer left-1/2 -translate-x-1/2 border-2 px-6 py-1 border-orange-90 bg-orange-10 -translate-y-[20px] rounded-t-xl text-orange-90">
                  Guild
                </div>
              </div>
              <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
                <p className="bg-red-10 h-[2px] w-[13%]"></p>
                <p className="bg-red-10 h-[2px] w-[70%]"></p>
                <p className="bg-red-10 h-[2px] w-[13%]"></p>
              </span>
              <div className="w-full bg-[#fff8de] rounded-b-[20px] flex flex-col rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-4 overflow-hidden mt-8">
                <div className="flex justify-center mt-14 mb-4">
                  <Image
                    src="/images/guild.png"
                    alt="cat pic"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center max-w-[260px] mx-auto">
                  You havent are join any guild yet. Join one to gain more
                  benefit
                </div>
                <div className="mt-8">
                  <div className="flex gap-2 justify-center">
                    <div
                      className="w-[156px] h-[39px]"
                      onClick={handleFindGuildClick}
                    >
                      <Button>Find a Guild</Button>
                    </div>
                    <div className="w-[156px] h-[39px]">
                      <Button>Create a Guild</Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex">
                <div className="absolute cursor-pointer left-1/2 -translate-x-1/2 border-2 px-6 py-1 border-orange-90 bg-orange-10 -translate-y-[20px] rounded-t-xl text-orange-90">
                  Guild Detail
                </div>
              </div>
              <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
                <p className="bg-red-10 h-[2px] w-[13%]"></p>
                <p className="bg-red-10 h-[2px] w-[70%]"></p>
                <p className="bg-red-10 h-[2px] w-[13%]"></p>
              </span>
              <div className="bg-[#fff8de] w-full rounded-b-[20px] flex flex-col justify-between rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-4 overflow-hidden mt-8">
                <div className="flex items-center gap-1 text-[#A61D47]">
                  <LogOut size={18} className="text-[#A61D47]" />
                  <span>Leave Guild</span>
                </div>
                <div className="flex justify-center">
                  <Image
                    src={guild?.backgroundUrl || "/images/bg-deploy.png"}
                    alt="cat pic"
                    width={150}
                    height={200}
                  />
                </div>
                <div className="flex gap1 items-center justify-center mb-2">
                  <div>
                    <Image
                      src={guild?.imageUrl || "/images/bg-deploy.png"}
                      alt="cat pic"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="text-xl">{guild?.title}</div>
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
                      <div>{guild?.totalMinted}M</div>
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
                      <div>{guild?.totalMember}M</div>
                    </div>
                  </div>
                </div>
                <div className="overflow-y-auto">
                  {[...Array(Number(guild?.totalMember))].map((_, index) =>
                    guild?.member[index] ? (
                      <div key={index} className="mb-1">
                        <CardFriend friend={guild?.member[index]} />
                      </div>
                    ) : null
                  )}
                </div>
                <div className="flex justify-center pt-2">
                  <div className="w-[156px] h-[39px]">
                    <Button>Invite Friend</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Guild;
