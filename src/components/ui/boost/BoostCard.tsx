import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { UserBoost } from "@/types/boost";
import classNames from "classnames";
import moment from "moment";

type Props = {
  type: string;
  userBoost?: UserBoost;
};

export const BoostCard = ({ type, userBoost }: Props) => {
  const [durationHours, setDurationHours] = useState<string>();
  const [durationMinutes, setDurationMinutes] = useState<string>();
  const [durationSeconds, setDurationSeconds] = useState<string>();
  const [startIntervalBoostTimer, setStartIntervalBoostTimer] = useState(true);

  const boostTimer = () => {
    const now = moment().utc().startOf("seconds");
    const diffInMiliseconds = moment(userBoost?.endAt)
      .startOf("seconds")
      .diff(now);
    const duration = moment.duration(diffInMiliseconds);
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes());
    const seconds = Math.floor(duration.asSeconds()) - minutes * 60;
    setDurationHours(hours.toString().padStart(2, "0"));
    setDurationMinutes(minutes.toString().padStart(2, "0"));
    setDurationSeconds(seconds.toString().padStart(2, "0"));
  };

  useEffect(() => {
    // boostTimer();
    if (startIntervalBoostTimer) {
      const interval = setInterval(() => {
        boostTimer();
      }, 1000); // Update every second
      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [startIntervalBoostTimer, userBoost]);

  return (
    <div className="flex flex-col justify-center items-center border border-orange-20 rounded-xl px-2 py-2 shadow-bottom-2xl-orange-20">
      <div className="px-2 text-sm">{type} Boost slot</div>
      <div className="mt-2">
        <div
          className={classNames(
            "flex justify-center items-center w-[116px] h-[104px] text-orange-90",
            !userBoost ? "bg-orange-20" : "bg-orange-30"
          )}
        >
          {!userBoost && (
            <div className="w-full text-center text-orange-90">Empty</div>
          )}
          {userBoost && (
            <div>
              <Image
                src={userBoost.boostConfig.imgUrl}
                alt="Boost card"
                width={64}
                height={64}
                className="flex justify-center items-center"
              />
            </div>
          )}
        </div>
      </div>
      {!userBoost && (
        <div className="flex justify-center gap-x-1 mt-2">
          <div className="text-sm text-orange-90">--</div>
          <div className="text-sm text-orange-90">:</div>
          <div className="text-sm text-orange-90">--</div>
          <div className="text-sm text-orange-90">:</div>
          <div className="text-sm text-orange-90">--</div>
        </div>
      )}
      {userBoost && (
        <div className="flex justify-center items-center gap-x-1 mt-2">
          <div className="text-sm text-orange-90">{durationHours}</div>
          <div className="text-sm text-orange-90">:</div>
          <div className="text-sm text-orange-90">{durationMinutes}</div>
          <div className="text-sm text-orange-90">:</div>
          <div className="text-sm text-orange-90">{durationSeconds}</div>
        </div>
      )}
    </div>
  );
};
