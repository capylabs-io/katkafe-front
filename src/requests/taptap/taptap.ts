import { BASE_URL } from "@/constants/api-url";
import katAxios from "../axios.config";

export const postTap = async (tap: number) => {
  const response = await katAxios.post(`${BASE_URL}/users/tap`, { tap });
  return response.data;
};
