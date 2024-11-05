import { BASE_URL } from "@/constants/api-url";
import katAxios from "../axios.config";

export const getWheelConfig = async () => {
  const response = await katAxios.get(
    `${BASE_URL}/mini-games/wheel-of-fortune`
  );
  return response.data;
};

export const spinWheel = async () => {
  const response = await katAxios.post(
    `${BASE_URL}/mini-games/wheel-of-fortune`
  );
  return response.data;
};

export const raidUser = async (isSRaid = false) => {
  const response = await katAxios.post(`${BASE_URL}/mini-games/kat-raid`, {
    isSRaid,
  });
  return response.data;
};

export const getRaidLog = async (query?: string) => {
  const response = await katAxios.get(`${BASE_URL}/mini-game-logs?${query}`);
  return response.data;
};

export const revengeRaid = async (logId: string) => {
  const response = await katAxios.post(
    `${BASE_URL}/mini-games/kat-raid/revenge`,
    {
      logId,
    }
  );
  return response.data;
};
