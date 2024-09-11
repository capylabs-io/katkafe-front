"use client";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useState, useRef } from "react";
import { useGamePlayStore } from "@/stores/GamePlayStore";
import { postTap } from "@/requests/taptap/taptap";
import { getClaim } from "@/requests/user";
import { useUserBoostsStore } from "@/stores/boost/userBoostsStore";
import moment from "moment";
import { set } from "lodash";
import { UserBoost } from "@/types/boost";

export const useGamePlay = () => {
  const [startIntervalRecoverPower, setStartIntervalRecoverPower] =
    useState(false);
  const [startIntervalPostTapping, setStartIntervalPostTapping] =
    useState(false);
  const [startIntervalCheckBoost, setstartIntervalCheckBoost] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const [userBoosts, setUserBoosts] = useUserBoostsStore((state) => [
    state.userBoosts,
    state.setUserBoosts,
  ]);
  const [increasePower, tapping, resetTapping] = useGamePlayStore((state) => [
    state.increasePower,
    state.tapping,
    state.resetTapping,
  ]);

  const clearClaimInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePostTapping = async (tappingNum: number) => {
    try {
      const res = await postTap(tappingNum!);
      if (res) {
        resetTapping();
        setUser(res);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleClaim = async () => {
    try {
      const response = await getClaim();
      if (response) {
        setUser(response);
      }
    } catch (error) {
      console.log("Error Claim", error);
    }
  };

  useEffect(() => {
    if (user && !user.isLoginFirstTime) {
      intervalRef.current = window.setInterval(() => {
        handleClaim();
      }, 5000);
    }
    return () => {
      clearClaimInterval();
    };
  }, [user?.bean, user, startIntervalPostTapping]);

  useEffect(() => {
    if (startIntervalRecoverPower) {
      const interval = setInterval(() => {
        increasePower();
      }, 1000); // Update every second
      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [startIntervalRecoverPower]);

  useEffect(() => {
    if (startIntervalPostTapping) {
      const interval = setInterval(() => {
        if (tapping! !== 0 || tapping) {
          handlePostTapping(tapping!);
        }
      }, 5000); // Update every second
      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [startIntervalPostTapping, tapping]);

  useEffect(() => {
    if (userBoosts.length && startIntervalCheckBoost) {
      const interval = setInterval(() => {
        const newUserBoosts: UserBoost[] = [];
        userBoosts.map((boost) => {
          if (moment().utc().isBefore(boost.endAt)) {
            return newUserBoosts.push(boost);
          }
        });
        setUserBoosts(newUserBoosts);
      }, 5000); // Update every second
      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [startIntervalCheckBoost, userBoosts.length]);

  return {
    setStartIntervalRecoverPower,
    setStartIntervalPostTapping,
    setstartIntervalCheckBoost,
    clearClaimInterval,
    handleClaim,
  };
};
