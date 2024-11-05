import { useMiniGameStore } from "@/stores/mini-game/useMiniGameStore";
import { get } from "lodash";
import React, { useEffect } from "react";

export const RaidingGameUI = () => {
  const raidUser = useMiniGameStore((state) => state.raidUser);
  const username = get(raidUser, "username", "Opponent's name");

  return (
    <div className="absolute game-ui top-0 bottom-0">
      <div className="mt-6 text-center border-red-10 border-2 mx-auto w-fit bg-orange-10 rounded-md px-4">
        Opponent: <span className="font-semibold">{username}</span>
      </div>
    </div>
  );
};
