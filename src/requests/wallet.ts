import { BASE_URL } from "@/constants/api-url";
import katAxios from "./axios.config";

export const saveWallet = async (body: any) => {
  const response = await katAxios.put(`${BASE_URL}/users/wallet-address`, body);
  return response.data;
};
