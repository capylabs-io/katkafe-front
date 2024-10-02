// import Slider from "@/components/ui/Slider";
import React, { useEffect } from "react";
import Image from "next/image";
import { useLeaderboad } from "@/lib/hooks/leaderboard/useLeaderboard";
import { useRankStore } from "@/stores/rank/rankStore";
import CardUser from "@/components/ui/CardUser";
import { LeaderBoard } from "@/types/leaderBoard";
import CardBarista from "@/components/ui/CardBarista";
import { get } from "lodash";
import { LEADERBOARDS } from "@/constants/leaderboard";

type Props = {
  currentLeaderboard?: { key: string; value: string } | undefined;
  onClose: (value: string) => void;
};

export const LeaderboardInfoPanel = ({
  currentLeaderboard,
  onClose,
}: Props) => {
  const [ranks, currentRank, totalUsers] = useRankStore((state) => [
    state.ranks,
    state.currentRank,
    state.totalUsers,
  ]);
  const { fetchLeaderboard } = useLeaderboad();

  const handleClose = () => {
    onClose && onClose(currentLeaderboard?.key || "");
  };

  useEffect(() => {
    fetchLeaderboard(
      get(currentLeaderboard, "path"),
      get(currentLeaderboard, "rarity")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -top-4 -left-4 cursor-pointer">
            <Image
              width={32}
              height={32}
              src="/images/back.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="absolute min-w-[200px] text-center left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            {currentLeaderboard?.value}
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="flex flex-col items-center justify-between w-full bg-[#fffeec] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-1 overflow-hidden mt-8">
            {/* <Slider ranks={[]} /> */}
            <div className="flex flex-col items-center w-full">
              <div className="bg-[url('/assets/cover.png')] bg-cover w-full mx-auto flex flex-col items-center mb-2">
                <Image
                  width={164}
                  height={164}
                  className="mb-2"
                  src={`/images/leaderboard/200px/${currentLeaderboard.key}.png`}
                  alt=""
                />
                {/* <div className="text-bodyXl text-gray-40">OWNER LEAGUE</div> */}
                <div className="text-bodyMd text-orange-90 mb-3">
                  Total user: {totalUsers}
                </div>
              </div>

              <div className="w-full overflow-auto !h-[calc(462px-30px-33px-172px-48px)]">
                {ranks.map((rank, index) => (
                  <div
                    key={rank._id}
                    className="w-full cursor-pointer bg-[#f7f6dc] border-[#e8ddbd] border-b first:rounded-t-lg last:rounded-b-lg h-12 overflow-hidden"
                  >
                    <CardBarista
                      key={rank._id}
                      id={index}
                      username={rank.username}
                      imageUrl={rank.avatarUrl}
                      value={rank.rankValue}
                      isShowIcon={
                        get(currentLeaderboard, "key", "") ===
                        LEADERBOARDS.GOLD.key
                          ? true
                          : false
                      }
                      iconUrl={`/images/coin.png`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-12 w-full absolute bottom-0">
              <CardUser
                user={currentRank as LeaderBoard}
                type="rank"
                isShowIcon={
                  get(currentLeaderboard, "key", "") === LEADERBOARDS.GOLD.key
                    ? true
                    : false
                }
                iconUrl={`/images/coin.png`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
