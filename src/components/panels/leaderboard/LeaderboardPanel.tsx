import { useLeaderboad } from "@/lib/hooks/leaderboard/useLeaderboard";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/common/Card";
import { LEADERBOARDS } from "@/constants/leaderboard";
import { LeaderboardInfoPanel } from "./LeaderboardInfoPanel";
import { get } from "lodash";
import { useRankStore } from "@/stores/rank/rankStore";

export const LeaderboardPanel = () => {
  const [setShowLeaderboardPanel] = useLayoutStore((state) => [
    state.setShowLeaderboardPanel,
  ]);

  const [currentLeaderboard, setCurrentLeaderboard] = useState<
    { key: string; value: string; path: string; rarity?: string } | undefined
  >(undefined);

  const [totalUsers] = useRankStore((state) => [state.totalUsers]);

  const { showPanel, setShowPanel, fetchUserCount } = useLeaderboad();

  const handleClose = () => {
    setShowLeaderboardPanel(false);
  };

  const handleOpenLeaderboard = (key: string) => {
    setShowPanel({ ...showPanel, [key]: true });
    setCurrentLeaderboard({
      key,
      value: get(LEADERBOARDS[key], "value", ""),
      path: get(LEADERBOARDS[key], "path", ""),
      rarity: get(LEADERBOARDS[key], "rarity"),
    });
  };

  const handleCloseLeaderboard = (key: string) => {
    setShowPanel({ ...showPanel, [key]: false });
    setCurrentLeaderboard(undefined);
  };

  useEffect(() => {
    fetchUserCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
              <div className="uppercase font-semibold">LEADERBOARD</div>
            </div>

            <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
              <p className="bg-red-10 h-[2px] w-[13%]"></p>
              <p className="bg-red-10 h-[2px] w-[70%]"></p>
              <p className="bg-red-10 h-[2px] w-[13%]"></p>
            </span>
            <div className="flex flex-col items-center justify-between w-full bg-[#fffeec] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-1 overflow-hidden mt-8">
              {/* <Slider ranks={[]} /> */}
              <div className="flex flex-col items-center w-full overflow-auto">
                <div className="w-full h-96 relative mt-2">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src="/images/leaderboard/background.png"
                    alt=""
                  />
                </div>

                <div className="text-bodyMd text-orange-90 mt-4">
                  Total user: {totalUsers}
                </div>

                <div className="overflow-y-auto w-full flex flex-wrap justify-center gap-2 mx-auto mb-2 mt-4">
                  {Object.values(LEADERBOARDS).map((item) => (
                    <Card
                      key={item.key}
                      className="w-[150px] h-[120]px border-gray-20 bg-orange-10 rounded-t-xl cursor-pointer shadow-bottom-2xl-gray-20"
                      onClick={() => handleOpenLeaderboard(item.key)}
                    >
                      <CardContent className="p-0">
                        <div className="w-full bg-[url('/images/leaderboard/pattern.png')] bg-cover rounded-t-xl">
                          <Image
                            width={120}
                            height={120}
                            src={`/images/leaderboard/80px/${item.key}.png`}
                            alt=""
                            className="mx-auto drop-shadow-2xl"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="p-0 my-2">
                        <div className="flex justify-center w-full">
                          <div className="text-sm uppercase font-medium">
                            {item.value}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentLeaderboard && (
        <LeaderboardInfoPanel
          onClose={handleCloseLeaderboard}
          currentLeaderboard={currentLeaderboard}
        />
      )}
    </>
  );
};
