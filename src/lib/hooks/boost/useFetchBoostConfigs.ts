import { getBoostConfig } from "@/requests/boost/boost-config";
import { useLoadingStore } from "@/stores/LoadingStore";
import { BoostConfig } from "@/types/boost";
import { useState } from "react";

export const useFetchBoostConfig = () => {
  const [boostConfigs, setBoostConfigs] = useState<BoostConfig[]>([]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);

  const fetchBoostConfigs = async () => {
    try {
      show();
      const response = await getBoostConfig();
      setBoostConfigs(response);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      hide();
    }
  };

  return {
    boostConfigs,
    fetchBoostConfigs,
  };
};
