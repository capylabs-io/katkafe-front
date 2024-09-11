import { BASE_URL } from "@/constants/api-url";
import katAxios from "../axios.config";
import { UserBoost } from "@/types/boost";

export const getUserBoosts = async () => {
  const response = await katAxios.get<UserBoost[]>(`${BASE_URL}/user-boosts`);
  return response.data;
};
