import { BASE_URL } from "@/constants/api-url";
import katAxios from "./axios.config";
import { CatConfig } from "@/types/cat-config";

export const getAllCatConfigs = async () => {
  const response = await katAxios.get<CatConfig[]>(`${BASE_URL}/cat-configs`);
  return response.data;
};
