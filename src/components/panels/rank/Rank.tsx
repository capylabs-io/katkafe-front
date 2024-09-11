// import Slider from "@/components/ui/Slider";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect } from "react";
import Image from "next/image";
import { useFetchRanks } from "@/lib/hooks/rank/useRank";
import { useRankStore } from "@/stores/rank/rankStore";
import CardUser from "@/components/ui/CardUser";
import { LeaderBoard } from "@/types/leaderBoard";
import CardBarista from "@/components/ui/CardBarista";

type Props = {};

function Rank({}: Props) {
  const [setShowRankPanel] = useLayoutStore((state) => [
    state.setShowRankPanel,
  ]);
  const [ranks, currentRank, totalUsers] = useRankStore((state) => [
    state.ranks,
    state.currentRank,
    state.totalUsers,
  ]);
  const { fetchRanks } = useFetchRanks();

  const handleClose = () => {
    setShowRankPanel(false);
  };

  useEffect(() => {
    fetchRanks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <Image
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
              width={24}
              height={24}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            LeaderBoard
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="flex flex-col items-center justify-between w-full bg-[#fffeec] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-1 overflow-hidden mt-8">
            {/* <Slider ranks={[]} /> */}
            <div className="flex flex-col items-center w-full">
              <img
                className="w-[164px] h-[164px] mb-2"
                src="/images/leaderboard.png"
                alt=""
              />
              <div className="text-bodyXl text-gray-40">OWNER LEAGUE</div>
              <div className="text-bodyMd text-orange-90 mb-3">
                Total user: {totalUsers}
              </div>
              <div className="w-full overflow-auto !h-[calc(462px-30px-33px-172px-48px)]">
                {ranks.map((rank, index) => (
                  <div
                    key={rank._id}
                    className="w-full cursor-pointer bg-[#f7f6dc] border-[#e8ddbd] border-b first:rounded-t-lg last:rounded-b-lg h-12 overflow-hidden"
                  >
                    <CardBarista
                      key={rank._id}
                      type={""}
                      id={index}
                      username={rank.username}
                      avatarUrl={rank.avatarUrl}
                      referralReward="0"
                      bean={rank.bean}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-12 w-full absolute bottom-0">
              <CardUser user={currentRank as LeaderBoard | null} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rank;
