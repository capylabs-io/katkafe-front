import { BoostCard } from "@/components/ui/boost/BoostCard";
import { BoostItem } from "@/components/ui/boost/BoostItem";
import { useFetchBoostConfig } from "@/lib/hooks/boost/useFetchBoostConfigs";
import { useFetchUserBoosts } from "@/lib/hooks/boost/useFetchUserBoosts";
import { postBoost } from "@/requests/user";
import { useUserBoostsStore } from "@/stores/boost/userBoostsStore";
import { useLayoutStore } from "@/stores/layoutStore";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { BoostType } from "@/types/boost";
import { first } from "lodash";
import { use } from "matter";
import React, { useEffect, useState } from "react";

type Props = {};

function Boost({}: Props) {
  const activeTabClasses =
    "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";

  const [setShowBoostPanel] = useLayoutStore((state) => [
    state.setShowBoostPanel,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [showSnackbar] = useSnackBarStore((state) => [state.show]);

  const { boostConfigs, fetchBoostConfigs } = useFetchBoostConfig();
  const freeBoosts = boostConfigs.filter((config) => config.fee === "0");
  const idleBoosts = boostConfigs.filter(
    (config) => config.type === BoostType.IDLE && config.fee !== "0"
  );
  const tapBoosts = boostConfigs.filter(
    (config) => config.type === BoostType.TAP && config.fee !== "0"
  );

  const [userBoosts] = useUserBoostsStore((state) => [state.userBoosts]);
  const { fetchUserBoosts } = useFetchUserBoosts();
  const userIdleBoost = first(
    userBoosts.filter(
      (userBoost) => userBoost.boostConfig.type === BoostType.IDLE
    )
  );
  const userTapBoost = first(
    userBoosts.filter(
      (userBoost) => userBoost.boostConfig.type === BoostType.TAP
    )
  );

  const handleClose = () => {
    setShowBoostPanel(false);
  };

  const handleBoost = async (boostConfigId: string) => {
    try {
      show();
      const body = {
        boostConfigId,
      };
      await postBoost(body);
      await fetchUserBoosts();
      showSnackbar("Boost activated successfully");
    } catch (error) {
      showSnackbar("Boost activation failed");
    } finally {
      hide();
    }
  };

  useEffect(() => {
    fetchBoostConfigs();
    fetchUserBoosts();
    // add hooks cause infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative flex">
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="flex justify-center">
            <div
              className={`absolute cursor-pointer text-center min-w-[112px] left-[62%] -translate-x-[100px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${activeTabClasses}`}
            >
              Booster
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          {/* user booster */}
          <div className="bg-orange-10 rounded-b-[20px] flex flex-wrap justify-center rounded-t border border-gray-20 w-full overflow-y-auto scroll-style h-[calc(100%-32px)] p-4 mt-8">
            {/* booster card */}
            <div className="flex justify-center gap-x-2">
              <BoostCard type="Idle" userBoost={userIdleBoost} />
              <BoostCard type="Tap" userBoost={userTapBoost} />
            </div>

            {/* items free booster */}
            <div className="mt-4 mb-2">Free Boost</div>
            <div className="w-full flex flex-wrap gap-y-1 justify-center">
              {freeBoosts.map((boost) => (
                <BoostItem
                  key={boost._id}
                  boostConfig={boost}
                  isOtherBoostActive={
                    boost.type === BoostType.IDLE
                      ? !!userIdleBoost
                      : !!userTapBoost
                  }
                  onClick={handleBoost}
                />
              ))}
            </div>

            {/* items idle booster */}
            <div className="mt-4 mb-2">Idle Boost</div>
            <div className="w-full flex flex-wrap gap-y-1 justify-center">
              {idleBoosts.map((boost) => (
                <BoostItem
                  key={boost._id}
                  boostConfig={boost}
                  isOtherBoostActive={!!userIdleBoost}
                  onClick={handleBoost}
                />
              ))}
            </div>

            {/* items tap booster */}
            <div className="mt-4 mb-2">Tap Boost</div>
            <div className="w-full flex flex-wrap gap-y-1 justify-center">
              {tapBoosts.map((boost) => (
                <BoostItem
                  key={boost._id}
                  boostConfig={boost}
                  isOtherBoostActive={!!userTapBoost}
                  onClick={handleBoost}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boost;
