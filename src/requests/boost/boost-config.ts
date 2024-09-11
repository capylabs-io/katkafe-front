import { BASE_URL } from "@/constants/api-url";
import katAxios from "../axios.config";
import { BoostConfig } from "@/types/boost";

export const getBoostConfig = async () => {
  const response = await katAxios.get<BoostConfig[]>(
    `${BASE_URL}/boost-configs`
  );
  return response.data;
};
