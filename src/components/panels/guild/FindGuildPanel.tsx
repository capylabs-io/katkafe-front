import CardGuild from "@/components/ui/CardGuild";
import { useGuildStore } from "@/stores/guild/guildStore";
import { useLayoutStore } from "@/stores/layoutStore";
import React from "react";
import Image from "next/image";
import { Guild } from "@/types/guild";

type Props = {};

function FindGuild({}: Props) {
  const [
    setShowFindGuildPanel,
    showGuildDetailPanel,
    setShowGuildDetailPanel,
    setShowGuildPanel,
  ] = useLayoutStore((state) => [
    state.setShowFindGuildPanel,
    state.showGuildDetailPanel,
    state.setShowGuildDetailPanel,
    state.setShowGuildPanel,
  ]);
  const [guilds, setCurrentGuild] = useGuildStore((state) => [
    state.guilds,
    state.setCurrentGuild,
  ]);

  const handleClose = () => {
    setShowGuildPanel(false);
    setShowFindGuildPanel(false);
  };
  const handleChooseClick = (guild: Guild) => {
    setCurrentGuild(guild);
    setShowGuildDetailPanel(!showGuildDetailPanel);
  };
  const handleBack = () => {
    setShowFindGuildPanel(false);
  };


  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
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
            <div className="absolute cursor-pointer left-1/2 -translate-x-1/2 border-2 px-6 py-1 border-orange-90 bg-orange-10 -translate-y-[20px] rounded-t-xl text-orange-90">
              Find Guild
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-[#fffeec] w-full rounded-b-[20px] flex flex-col justify-between rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8">
            <div className="flex justify-center mt-3">
              <Image
                src="/images/guild.png"
                alt="cat pic"
                width={84}
                height={84}
              />
            </div>
            <div className="text-center my-2">These guilds are hiring</div>

            <div className="overflow-y-auto">
              {guilds.map((guild) => (
                <div
                  key={guild.id}
                  className="bg-[#f7f6dc] w-full border-[#EEEDD8] border-b first:rounded-t-lg last:border-b-0 last:rounded-b-lg"
                >
                  <div onClick={() => handleChooseClick(guild)}>
                    <CardGuild guild={guild} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindGuild;
